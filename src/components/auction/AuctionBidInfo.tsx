import { useTranslation } from "react-i18next";
import type { Auction } from "../../api/auctionApi";
import { formatAmount } from "../../utils/number";

export default function AuctionBidInfo({ auction }: { auction: Auction }) {
  const { t } = useTranslation();

  const getLastBidPrice = () => {
    const price = auction?.currentPriceHuf
      ? auction.currentPriceHuf
      : auction?.startingPriceHuf;
    return formatAmount(price, "HUF");
  };

  return (
    <div className="flex items-center justify-between gap-4 my-2 w-full">
      <div className="flex-1">
        <p className="text-xs px-3 py-1.5">{t("auction.currentPriceHuf")}</p>
        <p className="text-xl font-bold px-3 py-1.5">{getLastBidPrice()}</p>
      </div>
      <div className="flex-1">
        <p className="text-xs px-3 py-1.5">{t("auction.bidCount")}</p>
        <p className="text-xl font-bold px-3 py-1.5">{auction?.bidCount}</p>
      </div>
    </div>
  );
}
