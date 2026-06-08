import { useEffect, useState } from "react";
import { getPageableAuctions, type Auction } from "../../api/auctionApi";
import { timeLeft } from "../../utils/date";
import { formatAmount } from "../../utils/number";
import ArrowRightIcon from "../../icons/ArrowRightIcon";
import { useNavigate } from "react-router-dom";
import EmptyTableRow from "../EmptyTableRow";
import { useTranslation } from "react-i18next";

const TABLE_HEAD = [
  { name: "item", className: "text-left" },
  { name: "startBid", className: "text-right" },
  { name: "recentBid", className: "text-right" },
  { name: "timeLeft", className: "text-right" },
  { name: "viewDetails", className: "text-right" },
];

export default function DashboardAuctionList() {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const pageable = {
      page: 0,
      size: 5,
      sort: "endDateTime,asc",
      customFilters: {
        status: "ACTIVE",
      },
    };
    getPageableAuctions(pageable)
      .then((response) => {
        setAuctions(response.content);
      })
      .catch(console.error);
  }, []);

  function handleNavigate(auctionId: number) {
    navigate("/auction/" + auctionId);
  }

  return (
    <div className="bg-container-background rounded-xl p-6 overflow-x-auto">
      <p className="text-sm font-medium text-[#F5F5F5] tracking-wide">
        {t("auction.active")}
      </p>

      {/* Table */}
      <table className="w-full min-w-175 text-sm mt-5">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head.name}
                className={`${head.className} text-xs font-medium text-[#8A8A8A] px-4 py-3 uppercase tracking-wider`}
              >
                {t(`dashboard.${head.name}`)}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-[#262626] text-[#8A8A8A]">
          {auctions.length === 0 ? (
            <EmptyTableRow
              colSpan={TABLE_HEAD.length}
              message="No active auctions"
            />
          ) : (
            auctions.map((auction) => (
              <tr key={auction.id} className="transition-colors">
                {/* Item */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5 w-full">
                    <div className="rounded-lg overflow-hidden bg-gray-300 flex items-center justify-center">
                      <img
                        src={`/images/${auction.item.imageUrl}.png`}
                        alt={auction.item.name}
                        className="w-10 h-10 object-contain bg-white"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[#F5F5F5] font-medium truncate">
                        {auction.item.name}
                      </span>
                      <span className="font-light truncate">
                        {`${t("by")} ${auction.seller.username}`}
                      </span>
                    </div>
                  </div>
                </td>

                {/* Start Bid */}
                <td className="px-4 py-3 text-right">
                  <span className="font-medium tabular-nums">
                    {formatAmount(auction.startingPriceHuf, "HUF")}
                  </span>
                </td>

                {/* Recent Bid */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5 justify-end">
                    <div className="rounded-lg overflow-hidden">
                      <img
                        src={`/images/${auction.bidder ? auction.bidder.avatarUrl : auction.seller.avatarUrl}.jpg`}
                        alt={
                          auction.bidder
                            ? auction.bidder.username
                            : auction.seller.username
                        }
                        className="w-10 h-10 object-cover"
                      />
                    </div>
                    <span className="font-medium tabular-nums">
                      {formatAmount(auction.currentPriceHuf, "HUF")}
                    </span>
                  </div>
                </td>

                {/* Time Left */}
                <td className="px-4 py-3 text-right">
                  <span className="font-medium tabular-nums">
                    {timeLeft(new Date(auction.endDateTime))}
                  </span>
                </td>

                {/* View */}
                <td className="px-4 py-3 text-right">
                  <span className="rounded-lg flex flex-col items-end">
                    <button
                      className="hover:rounded-lg hover:bg-gray-300 transition-opacity"
                      onClick={() => handleNavigate(auction.id)}
                    >
                      <ArrowRightIcon />
                    </button>
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
