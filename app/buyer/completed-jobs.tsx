import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

function CompletedJobs({ className }: Props) {
  return (
    <div className={cn(" flex justify-between pr-4 flex-col", className)}>
      <div className="flex-1 flex items-center justify-between">
        <div className="flex flex-1 items-center relative">
          <div className="absolute h-full w-2 rounded-4xl bg-primary-dark" />
          <div className="flex-1 flex flex-col ps-4 gap-2">
            <span className="font-semibold text-primary">Web Design</span>
            <div className="space-x-3">
              <span className="text-2xl text-primary-dark font-semibold">
                4
              </span>
              <span className="inline text-gray-500">Jobs</span>
            </div>
          </div>
        </div>
        <div className="flex flex-1 items-center relative">
          <div className="absolute h-full w-2 rounded-4xl bg-yellow" />
          <div className="flex-1 flex flex-col ps-4 gap-2">
            <span className="font-semibold text-primary">Web Design</span>
            <div className="space-x-3">
              <span className="text-2xl text-yellow font-semibold">4</span>
              <span className="inline text-gray-500">Jobs</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-between">
        <div className="flex flex-1 items-center relative">
          <div className="absolute h-full w-2 rounded-4xl bg-indigo-500" />
          <div className="flex-1 flex flex-col ps-4 gap-2">
            <span className="font-semibold text-primary">Web Design</span>
            <div className="space-x-3">
              <span className="text-2xl text-indigo-500 font-semibold">4</span>
              <span className="inline text-gray-500">Jobs</span>
            </div>
          </div>
        </div>
        <div className="flex flex-1 items-center relative">
          <div className="absolute h-full w-2 rounded-4xl bg-yellow-500" />
          <div className="flex-1 flex flex-col ps-4 gap-2">
            <span className="font-semibold text-primary">Web Design</span>
            <div className="space-x-3">
              <span className="text-2xl text-yellow-500 font-semibold">4</span>
              <span className="inline text-gray-500">Jobs</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompletedJobs;
