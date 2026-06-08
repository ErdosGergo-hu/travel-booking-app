import { useEffect, useState } from "react";
import { getBidsByAuctionId, type Bid } from "../api/bidApi";
import type { Auction } from "../api/auctionApi";
import { timeAgo } from "../utils/date";
import { formatAmount } from "../utils/number";
import { useTranslation } from "react-i18next";

export default function BidHistory({ auction }: { auction: Auction }) {
  const [bids, setBids] = useState<Bid[]>([]);
  const [expanded, setExpanded] = useState(false);
  const { t } = useTranslation();

  const visibleBids = expanded ? bids : bids.slice(0, 5);
  const hasMore = bids.length > 5;

  useEffect(() => {
    getBidsByAuctionId(auction.id)
      .then((bids) => {
        setBids(bids);
      })
      .catch(console.error);
  }, [auction]);

  return (
    <div className="w-full rounded-xl max-w-xl font-sans mt-5 bg-container-background shadow-[#262626] border border-[#262626] overflow-hidden text-[#8A8A8A]">
      <div className="flex items-center justify-between p-4">
        <div>
          <h3 className="text-xl font-bold">{t("bid.history")}</h3>
        </div>
      </div>

      {/* Table */}
      <div>
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="text-left text-xs font-medium px-4 py-3 uppercase tracking-wider">
                {t("bid.bidder")}
              </th>
              <th className="text-right text-xs font-medium px-4 py-3 uppercase tracking-wider">
                {t("bid.amount")}
              </th>
              <th className="text-right text-xs font-medium px-4 py-3 uppercase tracking-wider">
                {t("bid.time")}
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#262626]">
            {visibleBids.map((bid) => (
              <tr
                key={bid.id}
                className="transition-colors border-b border-[#262626]"
              >
                {/* Bidder */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="rounded-full overflow-hidden flex items-center justify-center">
                      <img
                        src={`/images/${bid.bidder.avatarUrl}.jpg`}
                        alt={bid.bidder.username}
                        className="w-10 h-10 object-cover"
                      />
                    </div>
                    <span className="font-medium truncate max-w-32.5">
                      {bid.bidder.username}
                    </span>
                  </div>
                </td>

                {/* Amount */}
                <td className="px-4 py-3 text-right">
                  <span className="font-semibold tabular-nums">
                    {formatAmount(bid.amountHuf, "HUF")}
                  </span>
                </td>

                {/* Time */}
                <td className="px-4 py-3 text-right">
                  <span className="font-semibold tabular-nums">
                    {timeAgo(new Date(bid.createdAt), t)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {hasMore && (
          <button
            onClick={() => setExpanded((e) => !e)}
            className="w-full py-3 text-xs font-medium text-gray-400 hover:text-gray-600 hover:bg-gray-50 border-t border-gray-100 transition-colors"
          >
            {expanded ? "Show less ↑" : `Show ${bids.length - 5} more bids ↓`}
          </button>
        )}
      </div>
    </div>
  );
}
