import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { formatDate } from "../utils/date";
import { getUserProfileStat } from "../api/userApi";
import { formatAmount } from "../utils/number";
import {
  getActiveAuctionByCurrentUser,
  getFavouriteAuctionsByCurrentUser,
  getWonAuctionByCurrentUser,
  type Auction,
} from "../api/auctionApi";
import type { User } from "../context/AuthContext";
import { useTranslation } from "react-i18next";
import type { TFunction } from "i18next";
import PageTitle from "../components/PageTitle";
import { Plus, SquarePen } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Tab = "active" | "won" | "favourites";

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

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    winning: "text-emerald-400 bg-emerald-400/10",
    outbid: "text-red-400    bg-red-400/10",
    won: "text-gold  bg-gold/10",
  };
  const labels: Record<string, string> = {
    winning: "Winning",
    outbid: "Outbid",
    won: "Won",
  };
  return (
    <span
      className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${map[status]}`}
    >
      {labels[status]}
    </span>
  );
}

function getStatusByTab(auction: Auction, tab: Tab, user: User): string {
  switch (tab) {
    case "active":
      return auction.bidder?.id === user.id ? "winning" : "outbid";
    case "won":
      return "won";
    case "favourites":
      return auction.bidder?.id === user.id ? "winning" : "outbid";
  }
}

function AuctionRow({
  auction,
  tab,
  user,
  t,
}: {
  auction: Auction;
  tab: Tab;
  user: User;
  t: TFunction;
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-white/6 bg-white/3 hover:bg-white/6 transition-colors">
      <div className="rounded-lg overflow-hidden bg-[#2D2D2D] flex items-center justify-center">
        <img
          src={`/images/${auction.item.imageUrl}.png`}
          alt={auction.item.name}
          className="w-10 h-10 object-contain"
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
              · {t("auction.endsIn")} {formatDate(auction.endDateTime)}
            </span>
          )}
        </p>
      </div>
      <StatusBadge status={getStatusByTab(auction, tab, user)} />
    </div>
  );
}

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

export default function ProfilePage() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [userStat, setUserStat] = useState<UserProfileStat>(initialUserStat);
  const [tab, setTab] = useState<Tab>("active");
  const [activeAuctions, setActiveAuctions] = useState<Auction[]>([]);
  const [wonAuctions, setWonAuctions] = useState<Auction[]>([]);
  const [favouriteAuctions, setFavouriteAuctions] = useState<Auction[]>([]);

  const tabData: Record<Tab, Auction[]> = {
    active: activeAuctions,
    won: wonAuctions,
    favourites: favouriteAuctions,
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
      getActiveAuctionByCurrentUser()
        .then((response) => {
          console.log(response);
          setActiveAuctions(response);
        })
        .catch(console.error);
      getFavouriteAuctionsByCurrentUser()
        .then((response) => {
          console.log(response);
          setFavouriteAuctions(response);
        })
        .catch(console.error);
    }
  }, [user]);

  const tabs: { key: Tab; label: string; count: number }[] = [
    {
      key: "active",
      label: t("user.activeAuctions"),
      count: activeAuctions.length,
    },
    { key: "won", label: t("user.won"), count: wonAuctions.length },
    {
      key: "favourites",
      label: t("user.favorites"),
      count: favouriteAuctions.length,
    },
  ];

  return (
    <>
      {user && (
        <>
          <PageTitle title={t("header.profile")} message={t("user.message")} />
          <div className="min-h-screen bg-container-background p-6 mt-6 font-sans rounded-2xl border border-white/[0.07] overflow-hidden mx-auto">
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.07]">
              <div className="flex items-center gap-4">
                <div className="rounded-xl overflow-hidden flex items-center justify-center border-2 border-gold">
                  <img
                    src={`/images/${user.avatarUrl}.jpg`}
                    alt={user.username}
                    className="w-16 h-16 object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="text-base font-semibold text-white">
                      {user.username}
                    </span>
                    <span className="text-[11px] font-medium text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">
                      {t("user.verified")}
                    </span>
                    {/* TODO: add edit profile button */}
                    <button onClick={() => navigate("/profile/update")}>
                      <SquarePen size={16} className="text-gold" />
                    </button>
                  </div>
                  <p className="text-xs text-white/40 mt-0.5">
                    {user.email} · {t("user.joined")}{" "}
                    {formatDate(user.createdAt)}
                  </p>
                </div>
              </div>
              <button
                onClick={() => navigate("/auctions/create")}
                className="px-3 py-2 gap-1 flex items-center text-[15px] font-medium text-[#262626] bg-gold hover:bg-gold-hover border-[#262626] rounded-xl transition-colors"
              >
                <Plus size={16} />
                {t("user.createAuction")}
              </button>
            </div>

            <div className="grid grid-cols-4 border-b border-white/[0.07]">
              <StatCard
                value={userStat.activeListings}
                label={t("user.activeListings")}
              />
              <StatCard
                value={userStat.finishedAuctions}
                label={t("user.finishedAuctions")}
              />
              <StatCard
                value={formatAmount(userStat.spent, "HUF")}
                label={t("user.totalSpent")}
              />
              <StatCard
                value={formatAmount(userStat.earnings, "HUF")}
                label={t("user.totalEarnings")}
              />
            </div>

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
                <AuctionRow
                  key={auction.id}
                  auction={auction}
                  tab={tab}
                  user={user}
                  t={t}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
