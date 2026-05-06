import type { Auction } from "../../api/auctionApi";
import AuctionCard from "./AuctionCard";

type AuctionListProps = {
  auctions: Auction[];
};

export default function AuctionList({ auctions }: AuctionListProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 min-h-75 flex">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {auctions.map((auction) => (
          <AuctionCard key={auction.id} auction={auction} />
        ))}
      </div>
    </div>
  );
}
