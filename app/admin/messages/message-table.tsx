"use client";
import { queryClient } from "@/app/query-client-provider";
import Pagination from "@/components/pagination";
import Table from "@/components/table";
import Button from "@/components/ui/button";
import Dialog from "@/components/ui/dialog";
import Text from "@/components/ui/text";
import useContacts from "@/hooks/useContacts";
import { formatDate } from "@/lib/utils";
import Column from "@/schemas/column";
import { Contact } from "@/schemas/contact";
import apiClient from "@/services/api-client";
import useContactStore from "@/store";

const columns: Column<Contact>[] = [
  {
    _id: 1,
    path: "firstName",
    label: "FirstName",
  },
  { _id: 2, path: "lastName", label: "LastName" },
  { _id: 3, path: "email", label: "Email" },
  {
    _id: 4,
    path: "message",
    label: "Message",
    content: (contact: Contact) => `${contact.message.slice(0, 40)}...`,
  },
  {
    _id: 5,
    path: "createdAt",
    label: "Created At",
    content: (contact: Contact) => formatDate(contact.createdAt),
  },
  {
    _id: 6,
    path: "_id",
    label: "Actions",
    content: (contact: Contact) => (
      <div className="space-x-2">
        <Dialog
          trigger={<Button className="py-1 px-3 text-sm">View</Button>}
          body={
            <div>
              <Text> {contact.firstName + " " + contact.lastName} </Text>
              <Text variant="gray" size="small">
                {" "}
                {contact.email}{" "}
              </Text>
              <div className="py-3">
                <Text> {contact.message} </Text>
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
                  await apiClient.delete(`/contacts/${contact._id}`);
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

export default function MessageTable() {
  const { data, isLoading } = useContacts();
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
      <Pagination
        currentPage={data.pagination.currentPage}
        pageCount={data.pagination.totalPages}
        next={nextPage}
        previous={previousPage}
        setPage={setPage}
      />
    </div>
  );
}
