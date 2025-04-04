"use client";
import { queryClient } from "@/app/query-client-provider";
import Pagination from "@/components/pagination";
import Table from "@/components/table";
import Button from "@/components/ui/button";
import Dialog from "@/components/ui/dialog";
import useUsers from "@/hooks/useUsers";
import { formatDate } from "@/lib/utils";
import Column from "@/schemas/column";
import { User } from "@/schemas/user";
import apiClient from "@/services/api-client";
import useContactStore from "@/store/contacts";

const columns: Column<User>[] = [
  {
    _id: 1,
    path: "firstName",
    label: "FirstName",
  },
  { _id: 2, path: "lastName", label: "LastName" },
  { _id: 3, path: "role", label: "Role" },
  { _id: 4, path: "email", label: "Email" },
  {
    _id: 5,
    path: "createdAt",
    label: "Created At",
    content: (contact: User) => formatDate(contact.createdAt),
  },
  {
    _id: 6,
    path: "_id",
    label: "Actions",
    content: (user: User) => (
      <div className="space-x-2">
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
                  await apiClient.delete(`/users/${user._id}`);
                  await queryClient.invalidateQueries({
                    queryKey: ["users"],
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

export default function UserTable() {
  const { data, isLoading } = useUsers();
  const setOrder = useContactStore((s) => s.setOrder);
  const orderBy = useContactStore((s) => s.orderBy);
  const currentOrder = useContactStore((s) => s.orderDirection);
  const nextPage = useContactStore((s) => s.nextPage);
  const previousPage = useContactStore((s) => s.previousPage);
  const setPage = useContactStore((s) => s.setPage);

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
