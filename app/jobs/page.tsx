"use client";
import useJobs from "@/hooks/useJobs";
import Job from "./job";

export default function JobsPage() {
  const { data, isLoading } = useJobs();
  if (isLoading) return <p>Loading...</p>;
  return (
    <div className="space-y-2 md:ps-6">
      {data?.result.map((job) => (
        <Job job={job} key={job._id} />
      ))}
    </div>
  );
}
