import { AppPieChart } from "@/components/app-pie-chart";
import CompletedJobs from "./completed-jobs";
import ActiveJobReport from "@/schemas/ActiveJobReport";

interface Props {
  data: ActiveJobReport;
}

function ActiveJobs({ data }: Props) {
  const config = {
    [data.rankOneByCategory?.category ?? ""]: {
      label: data.rankOneByCategory?.category ?? "",
      color: "#4285F4",
    },
    [data.rankTwoByCategory?.category ?? ""]: {
      label: data.rankTwoByCategory?.category ?? "",
      color: "#34A853",
    },
    [data.rankThreeByCategory?.category ?? ""]: {
      label: data.rankThreeByCategory?.category ?? "",
      color: "#FBBC05",
    },
    [data.rankFourByCategory?.category ?? ""]: {
      label: data.rankFourByCategory?.category ?? "",
      color: "#EA4335",
    },
  };

  const activeJobData = [
    {
      category: data.rankOneByCategory?.category ?? "",
      jobs: data.rankOneByCategory?.totalJobs ?? "",
    },
    {
      category: data.rankTwoByCategory?.category,
      jobs: data.rankTwoByCategory?.totalJobs ?? "",
    },
    {
      category: data.rankThreeByCategory?.category ?? "",
      jobs: data.rankThreeByCategory?.totalJobs ?? "",
    },
    {
      category: data.rankFourByCategory?.category ?? "",
      jobs: data.rankFourByCategory?.totalJobs ?? "",
    },
  ];

  return (
    <>
      <h2>Active Jobs</h2>
      <div className="bg-white flex flex-col md:flex-row items-center justify-between rounded-2xl border shadow">
        <div className="w-full md:w-1/2">
          <AppPieChart
            config={config}
            chartData={activeJobData}
            dataKey="jobs" // ✅ fix here
            nameKey="category" // ✅ name for each slice
          />
        </div>
        <div className="w-full md:w-1/2">
          <CompletedJobs
            data={data}
            config={config}
            className="h-[300px] px-4 lg:px-0"
          />
        </div>
      </div>
    </>
  );
}

export default ActiveJobs;
