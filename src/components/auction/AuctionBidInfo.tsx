import { useTranslation } from "react-i18next";
import type { Auction } from "../../api/auctionApi";

export default function AuctionBidInfo({ auction }: { auction: Auction }) {
  const { t } = useTranslation();

  const getLastBidPrice = () => {
    const price = auction?.currentPriceHuf
      ? auction.currentPriceHuf
      : auction?.startingPriceHuf;
    return price?.toLocaleString("hu-HU");
  };

  return (
    <div className="flex items-center justify-between gap-4 bg-white border-t border-gray-200 mt-2 mb-2 w-full">
      <div className="flex-1">
        <p className="text-xs text-gray-500 px-3 py-1.5">
          {t("auction.currentPriceHuf")}
        </p>
        <p className="text-xl font-bold text-slate-900 px-3 py-1.5">
          {getLastBidPrice() + " FT"}
        </p>
      </div>
      <div className="flex-1">
        <p className="text-xs text-gray-500 px-3 py-1.5">
          {t("auction.bidCount")}
        </p>
        <p className="text-xl font-bold text-slate-900 px-3 py-1.5">
          {auction?.bidCount}
        </p>
      </div>
    </div>
  );
}
