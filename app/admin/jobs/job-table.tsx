"use client";
import { queryClient } from "@/app/query-client-provider";
import Pagination from "@/components/pagination";
import Table from "@/components/table";
import Button from "@/components/ui/button";
import Dialog from "@/components/ui/dialog";
import Text from "@/components/ui/text";
import useJobs from "@/hooks/useJobs";
import { formatDate } from "@/lib/utils";
import Column from "@/schemas/column";
import { Job } from "@/schemas/job";
import apiClient from "@/services/api-client";
import useJobStore from "@/store/jobs";

const columns: Column<Job>[] = [
  {
    _id: 1,
    path: "title",
    label: "Title",
    content: (job: Job) => {
      if (job) {
        return job.title.slice(0, 40) + "...";
      }
      return null;
    },
  },
  {
    _id: 4,
    path: "createdAt",
    label: "Created At",
    content: (job: Job) => formatDate(job.createdAt),
  },
  {
    _id: 6,
    path: "_id",
    label: "Actions",
    content: (job: Job) => (
      <div className="space-x-2">
        <Dialog
          trigger={<Button className="py-1 px-3 text-sm">View</Button>}
          body={
            <div>
              <Text> {job.author.firstName + " " + job.author.lastName} </Text>
              <Text variant="gray" size="small">
                {" "}
                {job.title}{" "}
              </Text>
              <div className="py-3">
                <Text> {job.description} </Text>
              </div>
            </div>
          }
        />
        <Dialog
          trigger={
            <Button className="py-1 px-3 text-sm" variant="accent">
              Delete
            </Button>
          }
          body={
            <div>
              <h4>
                {" "}
                Are you sure you want to delete this contact? This action cannot
                be undone.{" "}
              </h4>
            </div>
          }
          actions={
            <>
              <Button className="py-1 px-3 text-sm">Cancel</Button>
              <Button
                onClick={async () => {
                  await apiClient.delete(`/jobs/${job._id}`);
                  await queryClient.invalidateQueries({
                    queryKey: ["contacts"],
                    refetchType: "active",
                  });
                }}
                className="py-1 px-3 text-sm"
                variant="accent"
              >
                Delete
              </Button>
            </>
          }
        />
      </div>
    ),
  },
];

export default function JobTable() {
  const { data, isLoading } = useJobs();
  const setOrder = useJobStore((s) => s.setOrder);
  const orderBy = useJobStore((s) => s.orderBy);
  const currentOrder = useJobStore((s) => s.orderDirection);
  const nextPage = useJobStore((s) => s.nextPage);
  const previousPage = useJobStore((s) => s.previousPage);
  const setPage = useJobStore((s) => s.setPage);

  if (isLoading) return <p>Loading...</p>;
  if (!data?.result) return <p>No data available</p>;

  return (
    <div>
      <Table
        columns={columns}
        onClick={setOrder}
        currentOrder={currentOrder}
        orderBy={orderBy}
        data={data.result}
      />
      {data.count > data.pagination.pageSize && (
        <Pagination
          currentPage={data.pagination.currentPage}
          pageCount={data.pagination.totalPages}
          next={nextPage}
          previous={previousPage}
          setPage={setPage}
        />
      )}
    </div>
  );
}
