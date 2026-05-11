import type { User } from "../../context/AuthContext";

export default function AuctionSeller({ seller }: { seller: User }) {
  return (
    <div className="bg-container-background rounded-2xl shadow-md shadow-[#262626] border border-[#262626] flex-1 p-5 h-min justify-center items-center flex flex-col text-secondary-font">
      <h1 className="text-3xl font-semibold mb-2 ">Seller</h1>

      <div className="rounded-full overflow-hidden flex items-center justify-center mb-2">
        <img
          src={`/images/${seller.avatarUrl}.jpg`}
          alt={seller.username}
          className="w-48 h-48 object-cover"
        />
      </div>

      <h2 className="text-lg font-semibold mb-2">Username</h2>
      <p className="text-sm flex-1 mb-2">{seller.username}</p>

      <h2 className="text-lg font-semibold mb-2">E-mail</h2>
      <p className="text-sm flex-1 mb-2">{seller.email}</p>
    </div>
  );
}
