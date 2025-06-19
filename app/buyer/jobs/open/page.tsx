"use client";

import { buttonVariants } from "@/components/ui/button";
import useMyJobs from "@/hooks/useMyJobs";
import { Flex } from "@radix-ui/themes";
import Link from "next/link";
import Job from "./job";

export default function OpenJobs() {
  const { data } = useMyJobs("OPEN");
  if (!data) return null;
  return (
    <div>
      <Flex align="center" justify="between" className="pb-6 border-b-2">
        <h1>Open Jobs</h1>
        <Link className={buttonVariants()} href="/buyer/jobs/new">
          Create New Job
        </Link>
      </Flex>
      <div className="space-y-2">
        {data?.data.map((job) => (
          <Job job={job} key={job._id} />
        ))}
      </div>
    </div>
  );
}
