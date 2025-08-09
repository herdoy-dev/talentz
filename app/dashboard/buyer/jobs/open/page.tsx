"use client";

import { buttonVariants } from "@/components/ui/button";
import useMyJobs from "@/hooks/useMyJobs";
import { Flex } from "@radix-ui/themes";
import Link from "next/link";
import Job from "./job";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PlusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function OpenJobs() {
  const { data, isLoading } = useMyJobs("OPEN");

  return (
    <Card className="border-none shadow-sm">
      <CardHeader>
        <Flex align="center" justify="between" className="pb-2">
          <div className="flex items-center gap-4">
            <CardTitle className="text-lg font-semibold">Open Jobs</CardTitle>
            {!isLoading && (
              <Badge variant="secondary" className="px-3 py-1">
                {data?.data.length || 0} Active
              </Badge>
            )}
          </div>
          <Link
            className={buttonVariants({
              variant: "default",
              className: "gap-2",
            })}
            href="/dashboard/buyer/jobs/new"
          >
            <PlusCircle className="h-4 w-4" />
            Create New Job
          </Link>
        </Flex>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-20 w-full rounded-lg" />
            ))}
          </div>
        ) : !data ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-gray-500">Unable to load open jobs</p>
          </div>
        ) : data.data.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 text-gray-400">
              <PlusCircle className="h-12 w-12" strokeWidth={1} />
            </div>
            <p className="text-gray-500 mb-4">No open jobs yet</p>
            <Link
              className={buttonVariants({ variant: "outline" })}
              href="/dashboard/buyer/jobs/new"
            >
              Create Your First Job
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {data.data.map((job) => (
              <Job job={job} key={job._id} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
