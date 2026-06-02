import { NavLink } from "react-router-dom";
import LanguageSelector from "./LanguageSelector";
import UserMenu from "./auth/UserMenu";
import { useAuth } from "../hooks/useAuth";
import type { User } from "../context/AuthContext";

const AVAIBLE_NAV_LINKS = [
  { name: "Dashboard", path: "/" },
  { name: "Auctions", path: "/auctions" },
  {
    name: "My Profile",
    path: "/profile",
    visible: (user: User | null) => !!user,
  },
];

export default function Header() {
  const { user } = useAuth();
  const navClass = ({ isActive }: { isActive: boolean }) => {
    return `border-b-2 text-secondary-font ${isActive ? "border-gold" : "border-b-transparent"} transition`;
  };

  return (
    <header className="h-25 bg-[#0D0D0D] relative flex items-center justify-between px-10 py-4">
      <div className="w-15">
        <img src="/images/barca.png" alt="main logo" />
      </div>
      <nav className="absolute left-1/2 -translate-x-1/2 flex items-center gap-10">
        {AVAIBLE_NAV_LINKS.filter(
          (link) => !link.visible || link.visible(user),
        ).map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) => navClass({ isActive })}
          >
            {link.name}
          </NavLink>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        <LanguageSelector />

        <UserMenu />
      </div>
    </header>
  );
}
