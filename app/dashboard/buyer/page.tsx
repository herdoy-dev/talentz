import RoyaltyProgress from "@/components/royalty-progress";
import { buttonVariants } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import ActiveJobReport from "@/schemas/ActiveJobReport";
import ApiResponse from "@/schemas/ApiRespose";
import SpendReport from "@/schemas/SpendReport";
import apiClient from "@/services/api-client";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import ActiveJobs from "./active-jobs";
import NewApplications from "./new-applications";
import NewActions from "./request-actions";
import SpendChart from "./spend-chart";

export const dynamic = "force-dynamic";

async function BuyerDashboard() {
  const [totalSpend, activeJobsReport] = await Promise.all([
    apiClient.get<ApiResponse<SpendReport>>("/buyer/spend-report"),
    apiClient.get<ApiResponse<ActiveJobReport>>("/buyer/active-jobs-report"),
  ]);

  return (
    <div className="md:p-4 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Overview of your job postings and activities
          </p>
        </div>
        <Link
          className={buttonVariants({
            className: "gap-2",
          })}
          href="/dashboard/buyer/jobs/new"
        >
          <PlusCircle className="h-4 w-4" />
          Post New Job
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-11 gap-6">
        <div className="lg:col-span-4">
          <NewApplications />
        </div>
        <div className="lg:col-span-4">
          <NewActions />
        </div>
        <div className="lg:col-span-3 md:px-10">
          <Calendar
            mode="single"
            className="rounded-2xl border shadow-sm w-full"
          />
        </div>

        <div className="lg:col-span-11 space-y-6">
          <ActiveJobs data={activeJobsReport.data.data} />
          <SpendChart data={totalSpend.data.data} />
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-11 grid md:grid-cols-2 grid-cols-1 gap-6">
          <RoyaltyProgress />
          <div className="p-4 rounded-3xl border">
            <h3 className="font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link
                href="/dashboard/buyer/jobs"
                className="text-sm font-medium text-primary hover:underline block"
              >
                View All Jobs
              </Link>
              <Link
                href="/dashboard/buyer/applications"
                className="text-sm font-medium text-primary hover:underline block"
              >
                Manage Applications
              </Link>
              <Link
                href="/dashboard/buyer/payments"
                className="text-sm font-medium text-primary hover:underline block"
              >
                Payment History
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuyerDashboard;
