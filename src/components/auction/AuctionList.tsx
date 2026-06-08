import { useTranslation } from "react-i18next";
import type { Auction } from "../../api/auctionApi";
import { useAuth } from "../../hooks/useAuth";
import EmptyTableRow from "../EmptyTableRow";
import AuctionCard from "./AuctionCard";

type AuctionListProps = {
  auctions: Auction[];
};

export default function AuctionList({ auctions }: AuctionListProps) {
  const { user } = useAuth();
  const { t } = useTranslation();
  return (
    <>
      {auctions.length === 0 ? (
        <div className="p-4 w-full flex justify-center">
          <EmptyTableRow colSpan={4} message={t("auction.emptyRow")} />
        </div>
      ) : (
        <div className="p-4 min-h-75 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {auctions.map((auction) => (
            <AuctionCard key={auction.id} auction={auction} user={user} />
          ))}
        </div>
      )}
    </>
  );
}
