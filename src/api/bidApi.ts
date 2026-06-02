import type { User } from "../context/AuthContext";
import { api } from "./api";
import type { Auction } from "./auctionApi";
const BASE_URL = import.meta.env.VITE_API_BASE_URL + "/bid";

export type Bid = {
  id: number;
  auction: Auction;
  createdAt: string;
  bidder: User;
  amountHuf: number;
};

export async function getBidsByAuctionId(auctionId: number): Promise<Bid[]> {
  const response = await api.get(BASE_URL + "/auction/" + auctionId);
  return response.data;
}
