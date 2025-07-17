import { AppPieChart } from "@/components/app-pie-chart";
import CompletedJobs from "./completed-jobs";

function ActiveJobs() {
  return (
    <div className="bg-white flex flex-col md:flex-row items-center justify-between rounded-2xl border shadow">
      <div className="w-full md:w-1/2">
        <AppPieChart />
      </div>
      <div className="w-full md:w-1/2">
        <CompletedJobs className="h-[300px] px-4 lg:px-0" />
      </div>
    </div>
  );
}

export default ActiveJobs;
