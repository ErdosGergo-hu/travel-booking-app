import DashboardAuctionList from "../components/dashboard/DashboardAuctionList";
import DashboardUserList from "../components/dashboard/DashboardUserList";

export default function DashboardPage() {
  return (
    <div className="p-10 flex flex-col gap-y-10">
      <DashboardAuctionList />
      <DashboardUserList />
    </div>
  );
}
