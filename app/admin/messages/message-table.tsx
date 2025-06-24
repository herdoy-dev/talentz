import DeleteTableItem from "@/components/delete-table-item";
import TableHead from "@/components/table-head";
import { formatDate } from "@/lib/utils";

import MessageDetails from "./message";
import { Contact } from "@/schemas/Contact";

interface Props {
  data: Contact[];
  count: number;
}

const columns = [
  { _id: 1, value: "firstName", label: "First Name" },
  { _id: 2, value: "lastName", label: "Last Name" },
  { _id: 3, value: "email", label: "Email" },
  { _id: 4, value: "message", label: "Message" },
  { _id: 5, value: "createdAt", label: "Date" },
  { _id: 6, value: "", label: "Action" },
];

export default function MessageTable({ data, count }: Props) {
  return (
    <div>
      <table className="table">
        <TableHead columns={columns} />
        <tbody>
          {data.map((contact) => (
            <tr key={contact._id}>
              <td> {contact.firstName} </td>
              <td> {contact.lastName} </td>
              <td> {contact.email} </td>
              <td> {contact.message.slice(0, 40)}... </td>
              <td> {formatDate(contact.createdAt)} </td>
              <td className="space-x-1">
                <MessageDetails message={contact} />
                <DeleteTableItem
                  id={contact._id}
                  count={count}
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
