"use client";

import { Badge } from "@/components/ui/badge";
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

export default function CompletedJob() {
  const { data } = useMyJobs("COMPLETED");
  if (!data) return null;
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Completed Jobs</h1>
        <Badge variant="outline" className="px-3 py-1 text-sm">
          {data?.data.length || 0} Jobs
        </Badge>
      </div>
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="w-[50%]">Job Title</TableHead>
            <TableHead className="text-right">You Earned</TableHead>
            <TableHead className="text-right">Completed Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.data.map((job) => (
            <TableRow key={job._id} className="hover:bg-gray-50">
              <TableCell>
                <JobDetails job={job} title={job.title} />
              </TableCell>
              <TableCell className="text-right font-semibold text-green-600">
                ${job.budgetAmount.toLocaleString()}
              </TableCell>
              <TableCell className="text-right text-gray-600">
                {formatDate(job.deliveryDate)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
