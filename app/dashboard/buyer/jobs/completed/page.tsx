"use client";

import { CompletedJobDetails } from "@/app/dashboard/_components/completed-job-details";
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
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle2 } from "lucide-react";

export default function CompletedJob() {
  const { data, isLoading } = useMyJobs("COMPLETED");

  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div className="flex items-center space-x-2">
          <CheckCircle2 className="h-5 w-5 text-green-500" />
          <CardTitle className="text-lg font-semibold">
            Completed Jobs
          </CardTitle>
        </div>
        <Badge variant="secondary" className="px-3 py-1 text-sm">
          {isLoading ? (
            <Skeleton className="h-4 w-8" />
          ) : (
            `${data?.data.length || 0} Jobs`
          )}
        </Badge>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : !data ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-gray-500">Unable to load completed jobs</p>
          </div>
        ) : data.data.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-gray-500">No completed jobs yet</p>
          </div>
        ) : (
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="w-[50%]">Job Details</TableHead>
                <TableHead className="text-right">Earnings</TableHead>
                <TableHead className="text-right">Completed On</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.data.map((job) => (
                <TableRow key={job._id} className="group hover:bg-gray-50/50">
                  <TableCell className="font-medium">
                    <CompletedJobDetails job={job} title={job.title} />
                  </TableCell>
                  <TableCell className="text-right font-semibold text-green-600">
                    $
                    {job.budgetAmount.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </TableCell>
                  <TableCell className="text-right text-gray-600">
                    <div className="flex flex-col">
                      <span>{formatDate(job.deliveryDate)}</span>
                      <span className="text-xs text-gray-400">
                        {new Date(job.deliveryDate).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
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
