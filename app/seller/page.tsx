import { AppBarChart } from "@/components/app-bar-chart";
import { AppLineChart } from "@/components/app-line-chart";
import { Calendar } from "@/components/calender";
import RoyaltyProgress from "@/components/royalty-progress";
import ActiveJobReport from "@/schemas/ActiveJobReport";
import ApiResponse from "@/schemas/ApiRespose";
import apiClient from "@/services/api-client";
import ActiveJobs from "./active-jobs";
import MyBalance from "./my-balance";

export const dynamic = "force-dynamic";

async function SellerDashboard() {
  const { data } = await apiClient.get<ApiResponse<ActiveJobReport>>(
    "/seller/active-jobs-report"
  );

  return (
    <div>
      <h1>Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-3 p-4 space-y-6">
          <MyBalance />
        </div>
        <div className="p-4 border shadow rounded-3xl">
          <AppBarChart />
        </div>
        <div className="p-4 border shadow rounded-3xl">
          <AppLineChart />
        </div>
        <div className="p-4 border shadow rounded-3xl">
          <Calendar />
        </div>
        <div className="col-span-3 space-y-6">
          <ActiveJobs data={data.data} />
          <RoyaltyProgress />
        </div>
      </div>
    </div>
  );
}

export default SellerDashboard;
