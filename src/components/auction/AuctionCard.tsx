import { useTranslation } from "react-i18next";
import type { Auction } from "../../api/auctionApi";
import { AuctionInfoBar } from "./AuctionInfoLine";
import { useNavigate } from "react-router-dom";

export default function AuctionCard({ auction }: { auction: Auction }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div
      key={auction.id}
      className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden flex flex-col"
    >
      <div className="w-full h-56 bg-gray-100 flex items-center justify-center">
        <img
          src={`/images/${auction.item.imageUrl}.jpg`}
          alt={auction.item.name}
          className="max-h-full max-w-full object-cover"
        />
      </div>

      <div className="p-4 flex flex-col flex-1 items-center justify-center">
        <h2 className="text-lg font-semibold mb-2">{auction.item.name}</h2>
        <p className="text-gray-600 text-sm flex-1 mb-2">
          {auction.item.description}
        </p>

        <AuctionInfoBar
          endDate={new Date(auction.endDateTime)}
          currentBid={auction.currentPriceHuf}
          bidCount={auction.bidCount}
        />

        <button
          onClick={() => navigate(`/auction/${auction.id}`)}
          className="mt-4 w-full bg-gray-900 text-white py-2 rounded-xl hover:bg-black transition"
        >
          {t("auction.view_details")}
        </button>
      </div>
    </div>
  );
}
