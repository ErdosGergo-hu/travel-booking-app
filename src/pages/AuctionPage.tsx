import { useParams } from "react-router-dom";
import {
  getAuctionById,
  updateActionByBid,
  type Auction,
} from "../api/auctionApi";
import { useEffect, useState } from "react";
import Countdown from "../components/Countdown";
import { formatDate } from "../utils/date";
import { useTranslation } from "react-i18next";
import AuctionBidInfo from "../components/auction/AuctionBidInfo";
import AuctionBidPlace from "../components/auction/AuctionBidPlace";
import AuctionSeller from "../components/auction/AuctionSeller";
import BidHistory from "../components/BidHistory";
import DialogModal from "../components/DialogModal";

export default function AuctionPage() {
  const { t } = useTranslation();
  const { id } = useParams();
  const [auction, setAuction] = useState<Auction | null>(null);
  const [newBid, setNewBid] = useState<number>(0);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("An error occurred");

  const numericId = Number(id);
  const bidPlacingIsDisabled: boolean = auction?.endDateTime
    ? new Date(auction.endDateTime).getTime() - new Date().getTime() < 0
    : false;

  useEffect(() => {
    getAuctionById(numericId)
      .then((a) => {
        setAuction(a);
        setNewBid(a.currentPriceHuf);
      })
      .catch((err) => {
        console.error("Error fetching auction:", err.response?.data || err);
        setErrorMessage("Error fetching auction");
        setError(true);
      });
  }, [numericId]);

  function handleCreateBid() {
    updateActionByBid(auction!.id, newBid)
      .then((a) => {
        setAuction(a);
        setNewBid(a.currentPriceHuf);
      })
      .catch((err) => {
        console.error("Error updating auction:", err.response?.data || err);
        setErrorMessage(err.response?.data.message || "Error updating auction");
        setError(true);
      });
  }

  return (
    <>
      {auction && (
        <>
          <div key={auction.id} className="flex flex-row gap-4">
            <div className="bg-container-background w-5xl rounded-xl shadow-md shadow-[#262626] border border-[#262626] overflow-hidden flex flex-3">
              <div className="flex-1 h-full bg-[#202020] flex items-center justify-center p-5">
                <img
                  src={`/images/${auction.item.imageUrl}.png`}
                  alt={auction.item.name}
                  className="max-w-full object-cover rounded-2xl max-h-100"
                />
              </div>

              <div className="px-8 py-2 flex items-start flex-col flex-1 w-50 text-[#8A8A8A]">
                <span
                  className={`bg-blue-100 text-blue-800 border-blue-200 items-center text-xs font-medium px-3 py-1.5 rounded-full border mb-4`}
                >
                  {auction.item.category}
                </span>

                <h2 className="text-lg font-semibold mb-2">
                  {auction.item.name}
                </h2>

                <p className="text-sm pb-2 border-b border-[#2A2A2A]">
                  {auction.item.description}
                </p>

                <AuctionBidInfo auction={auction!} />

                <div className="flex gap-4 border-t border-[#2A2A2A] mt-2 mb-2 w-full">
                  <Countdown date={auction.endDateTime} />
                  <div className="flex-1 h-full px-3 py-1.5 text-xs">
                    <p className="mb-4">{t("auction.endDateTime")}</p>
                    <p>{formatDate(auction.endDateTime)}</p>
                  </div>
                </div>

                <AuctionBidPlace
                  newBid={newBid}
                  setNewBid={setNewBid}
                  handleCreateBid={handleCreateBid}
                  bidPlacingIsDisabled={bidPlacingIsDisabled}
                />
              </div>
            </div>
            {auction.seller && <AuctionSeller seller={auction.seller} />}
          </div>
          {auction.id && <BidHistory auction={auction} />}
        </>
      )}
      <DialogModal
        open={error}
        message={errorMessage}
        onClose={() => {
          setError(false);
          setErrorMessage("");
        }}
      />
    </>
  );
}
