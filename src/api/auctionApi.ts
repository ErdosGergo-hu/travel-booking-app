import type { User } from "../context/AuthContext";
import { api } from "./api";
const BASE_URL = import.meta.env.VITE_API_BASE_URL + "/auction";

export const categories = ["ALL", "ELECTRONICS", "VEHICLE", "COLLECTIBLE"];

export type Category = (typeof categories)[number];

export const itemStatuses = ["ALL", "NEW", "GOOD", "USED"];

export type ItemStatus = (typeof itemStatuses)[number];

export type Item = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  quantity: number;
  category: Category;
};

export type Auction = {
  id: number;
  item: Item;
  bidCount: number;
  startDateTime: string;
  endDateTime: string;
  startingPriceHuf: number;
  currentPriceHuf: number;
  seller: User;
  bidder: User;
  isFavorite: boolean;
};

export type Page<T> = {
  totalPages: number;
  content: T[];
  pageable: Pageable;
};

export type Pageable = {
  page: number;
  size: number;
  sort: string;
  query?: string;
  enum?: {
    name: string;
    value: string;
  };
  customFilters?: Record<string, string>;
};

export async function getPageableAuctions(
  pageAble: Pageable,
): Promise<Page<Auction>> {
  const url = new URL(BASE_URL + "/search");

  url.searchParams.append("page", pageAble.page.toString());
  url.searchParams.append("size", pageAble.size.toString());
  url.searchParams.append("query", pageAble.query || "");
  url.searchParams.append("sort", pageAble.sort);

  if (pageAble.enum && pageAble.enum.value !== "ALL") {
    url.searchParams.append(pageAble.enum.name, pageAble.enum.value);
  }

  if (pageAble.customFilters) {
    Object.entries(pageAble.customFilters).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }

  const response = await api.get<Page<Auction>>(url.toString());

  return response.data;
}

export async function getAuctionById(id: number): Promise<Auction> {
  const response = await api.get<Auction>(BASE_URL + "/" + id);

  return response.data;
}

export async function updateActionByBid(
  auctionId: number,
  newPrice: number,
  userId: number,
): Promise<Auction> {
  const response = await api.put<Auction>(BASE_URL + "/" + auctionId + "/bid", {
    newPrice: newPrice,
    userId: userId,
  });

  return response.data;
}

export async function getWonAuctionByCurrentUser(): Promise<Auction[]> {
  const response = await api.get<Auction[]>(BASE_URL + "/me/won");

  return response.data;
}

export async function getActiveAuctionByCurrentUser(): Promise<Auction[]> {
  const response = await api.get<Auction[]>(BASE_URL + "/me/active");

  return response.data;
}

export async function getFavouriteAuctionsByCurrentUser(): Promise<Auction[]> {
  const response = await api.get<Auction[]>(BASE_URL + "/me/favorites");

  return response.data;
}
