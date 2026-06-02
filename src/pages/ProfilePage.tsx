import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { formatDate } from "../utils/date";
import { getUserProfileStat } from "../api/userApi";
import { formatAmount } from "../utils/number";
import { getWonAuctionByCurrentUser, type Auction } from "../api/auctionApi";

type Tab = "bids" | "won" | "favourites";

type UserProfileStat = {
  finishedAuctions: number;
  activeListings: number;
  earnings: number;
  spent: number;
};

const initialUserStat: UserProfileStat = {
  finishedAuctions: 0,
  activeListings: 0,
  earnings: 0,
  spent: 0,
};

const FAVOURITES: Auction[] = [];

// function StatusBadge({ status }: { status: Bid["status"] }) {
//   const map = {
//     winning: "text-emerald-400 bg-emerald-400/10",
//     outbid: "text-red-400    bg-red-400/10",
//     won: "text-gold  bg-gold/10",
//   };
//   const labels = { winning: "Winning", outbid: "Outbid", won: "Won" };
//   return (
//     <span
//       className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${map[status]}`}
//     >
//       {labels[status]}
//     </span>
//   );
// }

// ── Auction row ───────────────────────────────────────────────────────────────

function AuctionRow({ auction }: { auction: Auction }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-white/6 bg-white/3 hover:bg-white/6 transition-colors">
      <div className="rounded-lg overflow-hidden bg-gray-300 flex items-center justify-center">
        <img
          src={`/images/${auction.item.imageUrl}.jpg`}
          alt={auction.item.name}
          className="w-10 h-10 object-contain bg-white"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white truncate">
          {auction.item.name}
        </p>
        <p className="text-xs text-white/40">
          {formatAmount(auction.currentPriceHuf, "HUF")} Ft
          {auction.endDateTime && (
            <span className="ml-2">
              · ends in {formatDate(auction.endDateTime)}
            </span>
          )}
        </p>
      </div>
      {/* <StatusBadge status={auction.status} /> */}
    </div>
  );
}

// ── Stat card ─────────────────────────────────────────────────────────────────

function StatCard({ value, label }: { value: number | string; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-4 border-r border-white/[0.07] last:border-r-0">
      <span className="text-xl font-semibold text-gold tabular-nums">
        {value}
      </span>
      <span className="text-xs text-white/40 mt-0.5">{label}</span>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function ProfilePage() {
  const { user } = useAuth();
  const [userStat, setUserStat] = useState<UserProfileStat>(initialUserStat);
  const [tab, setTab] = useState<Tab>("bids");
  const [activeAuctions, setActiveAuctions] = useState<Auction[]>([]);
  const [wonAuctions, setWonAuctions] = useState<Auction[]>([]);

  const tabData: Record<Tab, Auction[]> = {
    bids: activeAuctions,
    won: wonAuctions,
    favourites: FAVOURITES,
  };

  useEffect(() => {
    if (user) {
      getUserProfileStat(user.id)
        .then((response) => {
          setUserStat(response);
        })
        .catch(console.error);
      getWonAuctionByCurrentUser()
        .then((response) => {
          console.log(response);
          setWonAuctions(response);
        })
        .catch(console.error);
    }
  }, [user]);

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: "bids", label: "Active bids", count: activeAuctions.length },
    { key: "won", label: "Won", count: wonAuctions.length },
    { key: "favourites", label: "Favourites", count: FAVOURITES.length },
  ];

  return (
    <>
      {user && (
        <div className="min-h-screen bg-container-background p-6 font-sans rounded-2xl border border-white/[0.07] overflow-hidden mx-auto">
          {/* ── Header ───────────────────────────────────────────────────── */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.07]">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-amber-500 flex items-center justify-center text-lg font-semibold text-amber-950 shrink-0">
                {user.username.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-2.5">
                  <span className="text-base font-semibold text-white">
                    {user.username}
                  </span>
                  <span className="text-[11px] font-medium text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">
                    Verified
                  </span>
                </div>
                <p className="text-xs text-white/40 mt-0.5">
                  {user.email} · Joined {formatDate(user.createdAt)}
                </p>
              </div>
            </div>
            {/* <button className="px-4 py-2 text-sm font-medium text-white/60 bg-white/6 hover:bg-white/10 border border-white/8 rounded-xl transition-colors">
              Edit profile
            </button> */}
          </div>

          <div className="grid grid-cols-4 border-b border-white/[0.07]">
            <StatCard value={userStat.activeListings} label="Active listings" />
            <StatCard
              value={userStat.finishedAuctions}
              label="Finished auctions"
            />
            <StatCard
              value={formatAmount(userStat.spent, "HUF")}
              label="Total spent"
            />
            <StatCard
              value={formatAmount(userStat.earnings, "HUF")}
              label="Total earned"
            />
          </div>

          {/* ── Tabs ─────────────────────────────────────────────────────── */}
          <div className="flex gap-1 px-6 pt-5 pb-0 border-b border-white/[0.07]">
            {tabs.map(({ key, label, count }) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`flex items-center gap-1.5 px-1 pb-3.5 text-sm font-medium border-b-2 transition-colors ${
                  tab === key
                    ? "text-gold border-gold"
                    : "text-white/35 border-transparent hover:text-white/60"
                }`}
              >
                {label}
                <span
                  className={`text-[11px] px-1.5 py-0.5 rounded-full ${
                    tab === key
                      ? "bg-amber-400/15 text-gold"
                      : "bg-white/6 text-white/30"
                  }`}
                >
                  {count}
                </span>
              </button>
            ))}
          </div>

          <div className="p-6 flex flex-col gap-2.5">
            {tabData[tab].map((auction) => (
              <AuctionRow key={auction.id} auction={auction} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
