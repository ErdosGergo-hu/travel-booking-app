import { useEffect, useState } from "react";
import ArrowRightIcon from "../../icons/ArrowRightIcon";
import { formatAmount } from "../../utils/number";
import type { User } from "../../context/AuthContext";
import { getDashboardUsers } from "../../api/userApi";

export default function DashboardUserList() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getDashboardUsers()
      .then((response) => {
        setUsers(response);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="bg-container-background rounded-xl p-6 overflow-x-auto">
      <p className="text-sm font-medium text-[#F5F5F5] tracking-wide">
        Most Popular Sellers
      </p>

      <table className="w-full min-w-175 text-sm mt-5">
        <tbody className="divide-y divide-[#262626] text-[#F5F5F5]">
          {users.map((user) => (
            <tr key={user.id} className="transition-colors">
              {/* Item */}
              <td className="py-3">
                <div className="flex items-center gap-2.5">
                  <div className="rounded-lg overflow-hidden flex items-center justify-center">
                    <img
                      src={`/images/${user.avatarUrl}.jpg`}
                      alt={user.username}
                      className="w-10 h-10 object-cover"
                    />
                  </div>
                  <span className="font-medium">{user.username}</span>
                </div>
              </td>

              {/* Finished Auctions */}
              <td className="py-3 text-right">
                <div className="flex flex-col font-medium">
                  <span>{user.finishedAuctions}</span>
                  <span className="text-[#8A8A8A]">Deliveries</span>
                </div>
              </td>

              {/* Current Auctions */}
              <td className="py-3 text-right">
                <div className="flex flex-col font-medium">
                  <span>{user.currentAuctions}</span>
                  <span className="text-[#8A8A8A]">Ongoing</span>
                </div>
              </td>

              {/* Earnings */}
              <td className="py-3 text-right">
                <div className="flex flex-col font-medium">
                  <span>{formatAmount(user.earnings || 0, "HUF")}</span>
                  <span className="text-[#8A8A8A]">Earnings</span>
                </div>
              </td>

              {/* View */}
              <td className="py-3 text-right">
                <span className="rounded-lg flex flex-col items-end">
                  <button
                    className="hover:rounded-lg hover:bg-gray-300 transition-opacity"
                    // onClick={() => handleNavigate(user.id)}
                  >
                    <ArrowRightIcon />
                  </button>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
