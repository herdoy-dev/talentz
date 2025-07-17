import { Calendar } from "@/components/calender";
import RoyaltyProgress from "@/components/royalty-progress";
import ActiveJobs from "./active-jobs";
import NewApplications from "./new-applications";
import NewActions from "./request-actions";
import SpendChart from "./spend-chart";

function BuyerDashboard() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* First row - 3 equal columns */}
        <div className="shadow rounded-lg p-4 md:col-span-1">
          <NewApplications />
        </div>
        <div className="shadow rounded-lg p-4 md:col-span-1">
          <NewActions />
        </div>
        <div className="shadow rounded-lg p-4 md:col-span-1 lg:col-span-1">
          <Calendar />
        </div>

        {/* Second row - pie chart and progress */}
        <div className="shadow rounded-lg p-4 md:col-span-2 lg:col-span-1 space-y-6">
          <ActiveJobs />
          <RoyaltyProgress />
        </div>

        {/* Third row - spend chart */}
        <div className="shadow rounded-lg p-4 md:col-span-2">
          <SpendChart />
        </div>
      </div>
    </div>
  );
}

export default BuyerDashboard;
