import DeleteAlert from "@/components/delete-alert";
import TableHead from "@/components/table-head";
import { formatDate } from "@/lib/utils";
import { ContactResponse } from "@/schemas/contact";
import MessageDetails from "./message";

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
                <MessageDetails message={contact} />
                <DeleteAlert
                  id={contact._id}
                  count={data.count}
                  path="/contacts"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
