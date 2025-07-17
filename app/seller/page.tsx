import { AppBarChart } from "@/components/app-bar-chart";
import { AppLineChart } from "@/components/app-line-chart";
import { Calendar } from "@/components/calender";
import RoyaltyProgress from "@/components/royalty-progress";
import ActiveJobs from "./active-jobs";
import MyBalance from "./my-balance";

function SellerDashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-2 space-y-10 p-4">
          <div className="p-4 border shadow rounded-3xl">
            <AppBarChart />
          </div>
          <div className="p-4 border shadow rounded-3xl">
            <AppLineChart />
          </div>
          <div>
            <RoyaltyProgress />
          </div>
        </div>
        <div className="col-span-1 p-4 space-y-6">
          <MyBalance />
          <Calendar />
          <div>
            <ActiveJobs />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerDashboard;
