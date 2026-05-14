import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { formatDate } from "../utils/date";

// ── Types ─────────────────────────────────────────────────────────────────────

type Tab = "bids" | "won" | "favourites";

interface Bid {
  id: number;
  title: string;
  amount: number;
  endsIn: string;
  status: "winning" | "outbid" | "won";
  image?: string;
}

// ── Demo data ─────────────────────────────────────────────────────────────────

const BIDS: Bid[] = [
  {
    id: 1,
    title: "iPhone 13",
    amount: 25010,
    endsIn: "24h",
    status: "winning",
  },
  {
    id: 2,
    title: "Omega Seamaster",
    amount: 110000,
    endsIn: "2h",
    status: "outbid",
  },
  {
    id: 3,
    title: "Vintage Leica M3",
    amount: 87500,
    endsIn: "3d",
    status: "winning",
  },
  {
    id: 4,
    title: "Levi's jacket",
    amount: 12000,
    endsIn: "5h",
    status: "outbid",
  },
];

const WON: Bid[] = [
  { id: 5, title: "AirPods Pro 2", amount: 44000, endsIn: "", status: "won" },
  { id: 6, title: "Canon AE-1", amount: 31500, endsIn: "", status: "won" },
  { id: 7, title: "Nike Air Max 90", amount: 18000, endsIn: "", status: "won" },
];

const FAVOURITES: Bid[] = [
  {
    id: 8,
    title: "MacBook Pro M1",
    amount: 320000,
    endsIn: "6d",
    status: "winning",
  },
  {
    id: 9,
    title: "Sony WH-1000XM5",
    amount: 55000,
    endsIn: "2d",
    status: "winning",
  },
];

// ── Status badge ──────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: Bid["status"] }) {
  const map = {
    winning: "text-emerald-400 bg-emerald-400/10",
    outbid: "text-red-400    bg-red-400/10",
    won: "text-gold  bg-gold/10",
  };
  const labels = { winning: "Winning", outbid: "Outbid", won: "Won" };
  return (
    <span
      className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${map[status]}`}
    >
      {labels[status]}
    </span>
  );
}

// ── Auction row ───────────────────────────────────────────────────────────────

function AuctionRow({ bid }: { bid: Bid }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-white/6 bg-white/3 hover:bg-white/6 transition-colors">
      <div className="w-10 h-10 rounded-lg bg-white/6 shrink-0 flex items-center justify-center">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18M9 21V9" />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white truncate">{bid.title}</p>
        <p className="text-xs text-white/40">
          {bid.amount.toLocaleString("hu-HU")} Ft
          {bid.endsIn && <span className="ml-2">· ends in {bid.endsIn}</span>}
        </p>
      </div>
      <StatusBadge status={bid.status} />
    </div>
  );
}

// ── Stat card ─────────────────────────────────────────────────────────────────

function StatCard({ value, label }: { value: string; label: string }) {
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
  const [tab, setTab] = useState<Tab>("bids");
  console.log("User: ", user);
  const tabData: Record<Tab, Bid[]> = {
    bids: BIDS,
    won: WON,
    favourites: FAVOURITES,
  };

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: "bids", label: "Active bids", count: BIDS.length },
    { key: "won", label: "Won", count: WON.length },
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

          {/* ── Stats ────────────────────────────────────────────────────── */}
          <div className="grid grid-cols-4 border-b border-white/[0.07]">
            <StatCard value="12" label="Active bids" />
            <StatCard value="5" label="Auctions won" />
            <StatCard value="342 500 Ft" label="Total spent" />
            <StatCard value="342 500 Ft" label="Total earned" />
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

          {/* ── Content ──────────────────────────────────────────────────── */}
          <div className="p-6 flex flex-col gap-2.5">
            {tabData[tab].map((bid) => (
              <AuctionRow key={bid.id} bid={bid} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
