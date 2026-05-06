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

export default function AuctionPage() {
  const { t } = useTranslation();
  const { id } = useParams();
  const [auction, setAuction] = useState<Auction | null>(null);
  const [newBid, setNewBid] = useState<number>(0);

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
      .catch(console.error);
  }, [numericId]);

  function handleCreateBid() {
    updateActionByBid(auction!.id, newBid)
      .then((a) => {
        setAuction(a);
        setNewBid(a.currentPriceHuf);
      })
      .catch(console.error);
  }

  console.log(auction);

  return (
    <>
      <div key={auction?.id} className="flex flex-row gap-4">
        <div className="bg-white w-5xl rounded-xl shadow-md border border-gray-200 overflow-hidden flex flex-3">
          <div className="flex-1 h-full bg-white flex items-center justify-center p-5">
            <img
              src={`/images/${auction?.item.imageUrl}.jpg`}
              alt={auction?.item.name}
              className="max-w-full object-cover rounded-2xl bg-gray-100 max-h-100"
            />
          </div>

          <div className="px-8 py-2 flex items-start flex-col flex-1 w-50">
            <span
              key={auction?.item.category}
              className={`bg-blue-100 text-blue-800 border-blue-200 items-center text-xs font-medium px-3 py-1.5 rounded-full border mb-4`}
            >
              {auction?.item.category}
            </span>

            <h2 className="text-lg font-semibold mb-2">{auction?.item.name}</h2>

            <p className="text-gray-600 text-sm mb-2">
              {auction?.item.description}
            </p>

            <AuctionBidInfo auction={auction!} />

            <div className="flex gap-4 bg-white border-t border-gray-200 mt-2 mb-2 w-full">
              <Countdown date={auction?.endDateTime} />
              <div className="flex-1 h-full px-3 py-1.5 text-xs text-gray-500">
                <p className="mb-4">{t("auction.endDateTime")}</p>
                <p>{formatDate(auction?.endDateTime)}</p>
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
        {auction?.seller && <AuctionSeller seller={auction.seller} />}
      </div>
      {auction?.id && <BidHistory auction={auction} />}
    </>
    // TODO: SELLER div hozzádsa jobbra, Bids history epdig alá
  );
}
