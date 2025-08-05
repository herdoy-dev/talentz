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

export default function JobManagemnet() {
  const { data } = useMyJobs("IN_PROGRESS");
  if (!data) return null;
  return (
    <>
      <h1 className="my-5">In Progress Jobs</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Job Title</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Deliver Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.data.map((job) => (
            <TableRow key={job._id}>
              <JobDetails job={job} title={job.title} />
              <TableCell className="text-2xl font-semibold text-primary-dark">
                ${job.budgetAmount}
              </TableCell>
              <TableCell>{formatDate(job.deliveryDate)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
