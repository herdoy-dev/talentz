import { AppBarChart } from "@/components/app-bar-chart";
import { AppLineChart } from "@/components/app-line-chart";
import { AppPieChart } from "@/components/app-pie-chart";
import { Calendar } from "@/components/calender";
import RoyaltyProgress from "@/components/royalty-progress";
import MyBalance from "./my-balance";

function SellerDashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-2 p-4 shadow space-y-6">
          <div>
            <AppBarChart />
          </div>
          <div>
            <AppLineChart />
          </div>
          <div>
            <RoyaltyProgress />
          </div>
        </div>
        <div className="col-span-1 p-4 shadow space-y-6">
          <MyBalance />
          <Calendar />
          <div>
            <AppPieChart />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerDashboard;
