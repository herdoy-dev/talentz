"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useJobs from "@/hooks/useJobs";
import { formatDate } from "@/lib/utils";
import { JobDetails } from "./job-details";

export default function JobManagemnet() {
  const { data } = useJobs();
  if (!data) return null;
  return (
    <>
      <h1 className="my-5">In Progress Jobs</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Job Title</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>Deliver Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.result.map((job) => (
            <TableRow key={job._id}>
              <JobDetails job={job} title={job.title} />
              <TableCell>{formatDate(job.createdAt)}</TableCell>
              <TableCell>{formatDate(job.createdAt)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
