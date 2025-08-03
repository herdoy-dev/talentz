import { Calendar } from "@/components/calender";
import RoyaltyProgress from "@/components/royalty-progress";
import { buttonVariants } from "@/components/ui/button";
import ActiveJobReport from "@/schemas/ActiveJobReport";
import ApiResponse from "@/schemas/ApiRespose";
import SpendReport from "@/schemas/SpendReport";
import apiClient from "@/services/api-client";
import Link from "next/link";
import ActiveJobs from "./active-jobs";
import NewApplications from "./new-applications";
import NewActions from "./request-actions";
import SpendChart from "./spend-chart";

export const dynamic = "force-dynamic";

async function BuyerDashboard() {
  const totalSpend = await apiClient.get<ApiResponse<SpendReport>>(
    "/buyer/spend-report"
  );
  const activeJobsReport = await apiClient.get<ApiResponse<ActiveJobReport>>(
    "/buyer/active-jobs-report"
  );
  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <Link className={buttonVariants()} href="/buyer/jobs/new">
          Post New Job
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="shadow border rounded-lg p-4 md:col-span-1">
          <NewApplications />
        </div>
        <div className="shadow border rounded-lg p-4 md:col-span-1">
          <NewActions />
        </div>
        <div className="shadow border rounded-lg p-4 md:col-span-1 lg:col-span-1">
          <Calendar />
        </div>

        {/* Second row - pie chart and progress */}
        <div className="lg:col-span-3 space-y-6">
          <ActiveJobs data={activeJobsReport.data.data} />
          <RoyaltyProgress />
          <SpendChart data={totalSpend.data.data} />
        </div>
      </div>
    </div>
  );
}

export default BuyerDashboard;
