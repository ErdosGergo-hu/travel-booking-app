import { useEffect, useState } from "react";
import { getBidsByAuctionId, type Bid } from "../api/bidApi";
import type { Auction } from "../api/auctionApi";

function formatAmount(amount: number, currency: string) {
  return `${amount.toLocaleString("hu-HU")} ${currency}`;
}

function timeAgo(date: Date): string {
  const diff = Math.floor((Date.now() - date.getTime()) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return date.toLocaleDateString();
}

export default function BidHistory({ auction }: { auction: Auction }) {
  const [bids, setBids] = useState<Bid[]>([]);
  const [expanded, setExpanded] = useState(false);

  const visibleBids = expanded ? bids : bids.slice(0, 5);
  const hasMore = bids.length > 5;

  useEffect(() => {
    getBidsByAuctionId(auction.id)
      .then((bids) => {
        console.log("Bids: ", bids);
        setBids(bids);
      })
      .catch(console.error);
  }, [auction]);

  return (
    <div className="w-full max-w-xl font-sans mt-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Bid history</h3>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left text-xs font-medium text-gray-400 px-4 py-3 uppercase tracking-wider">
                Bidder
              </th>
              <th className="text-right text-xs font-medium text-gray-400 px-4 py-3 uppercase tracking-wider">
                Amount
              </th>
              <th className="text-right text-xs font-medium text-gray-400 px-4 py-3 uppercase tracking-wider">
                Time
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-50 bg-white">
            {visibleBids.map((bid) => (
              <tr
                key={bid.id}
                className="transition-colors bg-emerald-50/60 border-b border-gray-200"
              >
                {/* Bidder */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="rounded-full overflow-hidden bg-gray-300 flex items-center justify-center">
                      <img
                        src={`/images/${bid.bidder.avatarUrl}.jpg`}
                        alt={bid.bidder.username}
                        className="w-10 h-10 object-cover"
                      />
                    </div>
                    <span className="font-medium truncate max-w-32.5 text-gray-900">
                      {bid.bidder.username}
                    </span>
                  </div>
                </td>

                {/* Amount */}
                <td className="px-4 py-3 text-right">
                  <span className="font-semibold tabular-nums text-gray-800">
                    {formatAmount(bid.amountHuf, "HUF")}
                  </span>
                </td>

                {/* Time */}
                <td className="px-4 py-3 text-right">
                  <span className="font-semibold text-gray-800 tabular-nums">
                    {timeAgo(new Date(bid.createdAt))}
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
