"use client";

import { Button } from "@/components/ui/button";
import useJobs from "@/hooks/useJobs";
import { Flex } from "@radix-ui/themes";
import Job from "./job";

export default function OpenJobs() {
  const { data } = useJobs();
  if (!data) return null;
  return (
    <div>
      <Flex align="center" justify="between" className="pb-6 border-b-2">
        <h1>Open Jobs</h1>
        <Button>Create New Job</Button>
      </Flex>
      <div className="space-y-2">
        {data?.result.map((job) => (
          <Job job={job} key={job._id} />
        ))}
      </div>
    </div>
  );
}
