import { useState } from "react";
import { logout } from "../../api/authApi";
import LogoutIcon from "../../icons/LogoutIcon";
import type { User } from "../../api/auctionApi";

export default function UserMenu() {
  const [open, setOpen] = useState(false);

  const user: User =
    typeof sessionStorage.getItem("user") === "string"
      ? JSON.parse(sessionStorage.getItem("user")!)
      : null;

  return (
    <div className="relative inline-block">
      <div className="w-10 h-10 rounded-full bg-gray-300">
        <button
          onClick={() => setOpen((o) => !o)}
          className="w-full h-full rounded-full bg-gray-300 text-white font-bold"
        >
          <div className="rounded-full overflow-hidden border-2 border-blue-500">
            <img
              src={`/images/${user ? user.avatarUrl : "default_profile"}.jpg`}
              alt={user ? user.username : "default_profile"}
              className="w-10 h-10 object-cover"
            />
          </div>
        </button>
      </div>
      {open && (
        <div
          role="listbox"
          className="absolute right-0 mt-1.5 w-30 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50 animate-in"
        >
          <button
            key="logout"
            role="option"
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-sm transition-colors duration-100 text-gray-700 hover:bg-gray-50"
          >
            <LogoutIcon />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
}
