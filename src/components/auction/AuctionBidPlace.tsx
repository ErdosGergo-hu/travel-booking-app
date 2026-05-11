import { useTranslation } from "react-i18next";

export default function AuctionBidPlace({
  newBid,
  setNewBid,
  handleCreateBid,
  bidPlacingIsDisabled,
}: {
  newBid: number;
  setNewBid: (value: number) => void;
  handleCreateBid: () => void;
  bidPlacingIsDisabled: boolean;
}) {
  const { t } = useTranslation();
  return (
    <div className="border-t border-[#2A2A2A] mt-2 mb-2 w-full">
      <p className="text-xs px-3 py-3">{t("auction.newBid")}</p>
      <div className="flex py-1.5">
        <div className="flex-2 relative w-64 mx-3">
          <input
            type="text"
            value={newBid}
            onChange={(e) => setNewBid(Number(e.target.value))}
            disabled={bidPlacingIsDisabled}
            placeholder="Keresés termékek közt..."
            className="w-full border border-[#2A2A2A] rounded-sm px-2 py-2 pr-14 
               focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:border-gray-200 disabled:text-gray-400"
          />

          <span className="absolute right-2 top-1/2 -translate-y-1/2">FT</span>
        </div>
        {/* TODO: Az input végére FT betevése */}
        <button
          onClick={handleCreateBid}
          disabled={bidPlacingIsDisabled}
          className="flex-1 text-xs font-medium text-background bg-gold rounded-sm hover:bg-gold-hover transition-colors disabled:bg-gray-400 disabled:hover:bg-gray-400 disabled:cursor-not-allowed"
        >
          {t("auction.placeBid")}
        </button>
      </div>
    </div>
  );
}
