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
      className="bg-container-background rounded-2xl shadow-md shadow-[#262626] border border-[#262626] overflow-hidden flex flex-col bg-linear-to-b from-[#1A1A1A] to-[#111111]"
    >
      <div className="w-full h-56 bg-[#202020] flex items-center justify-center">
        <img
          src={`/images/${auction.item.imageUrl}.png`}
          alt={auction.item.name}
          className="max-h-full max-w-full object-cover"
        />
      </div>

      <div className="px-4 py-2 flex flex-col flex-1 items-center justify-center text-secondary-font">
        <h1 className="text-lg font-semibold mb-4">{auction.item.name}</h1>
        <p className="text-sm flex-1 mb-2">{auction.item.description}</p>

        <AuctionInfoBar
          endDate={new Date(auction.endDateTime)}
          currentBid={auction.currentPriceHuf}
          bidCount={auction.bidCount}
        />

        <button
          onClick={() => navigate(`/auction/${auction.id}`)}
          className="mt-4 w-full font-semibold py-2 rounded-xl text-container-background transition bg-[#C6A85B] hover:bg-[#D4B46A]"
        >
          {t("auction.view_details")}
        </button>
      </div>
    </div>
  );
}
