import { api } from "./api";
const BASE_URL = import.meta.env.VITE_API_BASE_URL + "/auction";

export const categories = ["ALL", "ELECTRONICS", "VEHICLE", "COLLECTIBLE"];

export type Category = (typeof categories)[number];

export const itemStatuses = ["ALL", "NEW", "GOOD", "USED"];

export type ItemStatus = (typeof itemStatuses)[number];

export type User = {
  id: number;
  username: string;
  email: string;
  createdAt: string;
  avatarUrl: string;
};

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
};

export type Page<T> = {
  totalPages: number;
  content: T[];
  pageable: unknown;
};

export async function getPageableAuctions(
  page: number,
  size: number,
  category: Category,
  query: string,
): Promise<Page<Auction>> {
  const url = new URL(BASE_URL + "/search");

  url.searchParams.append("page", page.toString());
  url.searchParams.append("size", size.toString());
  url.searchParams.append("query", query);
  if (category !== "ALL") {
    url.searchParams.append("category", category.toString());
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
): Promise<Auction> {
  const response = await api.put<Auction>(BASE_URL + "/" + auctionId + "/bid", {
    newPrice: newPrice,
  });

  return response.data;
}
