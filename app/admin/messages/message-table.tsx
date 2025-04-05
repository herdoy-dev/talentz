import TableHead from "@/components/table-head";
import Button from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { ContactResponse } from "@/schemas/contact";

interface Props {
  data: ContactResponse;
}

const columns = [
  { _id: 1, value: "firstName", label: "First Name" },
  { _id: 2, value: "lastName", label: "Last Name" },
  { _id: 3, value: "email", label: "Email" },
  { _id: 4, value: "message", label: "Message" },
  { _id: 5, value: "createdAt", label: "Date" },
  { _id: 6, value: "", label: "Action" },
];

export default function MessageTable({ data }: Props) {
  return (
    <div>
      <table className="table">
        <TableHead columns={columns} />
        <tbody>
          {data.result.map((contact) => (
            <tr key={contact._id}>
              <td> {contact.firstName} </td>
              <td> {contact.lastName} </td>
              <td> {contact.email} </td>
              <td> {contact.message.slice(0, 40)}... </td>
              <td> {formatDate(contact.createdAt)} </td>
              <td className="space-x-1">
                <Button className="py-1 px-3 text-sm">View</Button>
                <Button variant="accent" className="py-1 px-3 text-sm">
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
