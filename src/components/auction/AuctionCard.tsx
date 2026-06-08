import { useTranslation } from "react-i18next";
import type { Auction } from "../../api/auctionApi";
import { AuctionInfoBar } from "./AuctionInfoLine";
import { useNavigate } from "react-router-dom";
import type { User } from "../../context/AuthContext";
import { toggleFavorite } from "../../api/favoriteApi";
import { Heart } from "lucide-react";
import { useState } from "react";

export default function AuctionCard({
  auction,
  user,
}: {
  auction: Auction;
  user: User | null;
}) {
  const { t } = useTranslation();
  const [favorited, setFavorited] = useState<boolean>(auction.isFavorite);
  const navigate = useNavigate();

  function handleToggleFavorite() {
    if (user) {
      toggleFavorite(user.id, auction.id)
        .then((response) => {
          setFavorited(response.favorite);
        })
        .catch((error) => {
          console.error(
            t("favorite.error.toggle"),
            error.response?.data || error,
          );
        });
    }
  }

  return (
    <div
      key={auction.id}
      className="bg-container-background rounded-2xl shadow-md shadow-[#262626] border border-[#262626] overflow-hidden flex flex-col bg-linear-to-b from-[#1A1A1A] to-[#111111]"
    >
      <div className="w-full h-56 bg-[#202020] flex items-center justify-center">
        <img
          src={`/images/${auction.item.imageUrl}.png`}
          alt={auction.item.name}
          className="max-h-full max-w-full object-cover"
        />
      </div>

      <div className="px-4 py-2 flex flex-col flex-1 items-center justify-center text-secondary-font">
        <h1 className="text-lg font-semibold mb-4">{auction.item.name}</h1>
        <p className="text-sm flex-1 mb-2">{auction.item.description}</p>

        <AuctionInfoBar
          endDate={new Date(auction.endDateTime)}
          currentBid={auction.currentPriceHuf}
          bidCount={auction.bidCount}
        />

        <div className="flex w-full mt-4 gap-2">
          {auction.seller.id !== user?.id && (
            <button
              onClick={handleToggleFavorite}
              className="flex-1 inline-flex items-center justify-center rounded-lg bg-[#202020] border border-[#262626] hover:bg-[#2A2A2A] transition-colors"
            >
              <Heart
                className={
                  favorited ? "fill-gold stroke-gold" : "fill-none stroke-gold"
                }
              />
            </button>
          )}
          <button
            onClick={() => navigate(`/auction/${auction.id}`)}
            className="flex-5 font-semibold py-2 rounded-lg text-container-background transition bg-[#C6A85B] hover:bg-[#D4B46A]"
          >
            {auction.seller.id === user?.id
              ? t("auction.viewDetails")
              : t("auction.placeBid")}
          </button>
        </div>
      </div>
    </div>
  );
}
