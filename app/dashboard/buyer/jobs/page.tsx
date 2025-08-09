"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useMyJobs from "@/hooks/useMyJobs";
import { formatDate } from "@/lib/utils";
import { JobDetails } from "./job-details";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function JobManagement() {
  const { data, isLoading } = useMyJobs("IN_PROGRESS");

  return (
    <Card className="border-none shadow-sm">
      <CardHeader>
        <h1 className="text-2xl font-semibold text-gray-800">
          In Progress Jobs
        </h1>
        <p className="text-sm text-gray-500">
          {data
            ? `Showing ${data.data.length} jobs in progress`
            : "Loading your active jobs..."}
        </p>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        ) : !data ? (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-gray-500">Unable to load jobs data</p>
          </div>
        ) : data.data.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-gray-500">No jobs in progress</p>
          </div>
        ) : (
          <Table className="min-w-[600px]">
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="w-[40%]">Job Title</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Delivery Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.data.map((job) => (
                <TableRow key={job._id} className="hover:bg-gray-50/50">
                  <TableCell className="font-medium">
                    <JobDetails job={job} title={job.title} />
                  </TableCell>
                  <TableCell className="text-right font-semibold text-primary">
                    ${job.budgetAmount.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className="bg-blue-100 text-blue-800"
                    >
                      In Progress
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span>{formatDate(job.deliveryDate)}</span>
                      {new Date(job.deliveryDate) < new Date() && (
                        <Badge variant="destructive">Overdue</Badge>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
