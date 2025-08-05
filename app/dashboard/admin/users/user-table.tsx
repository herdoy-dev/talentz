import DeleteTableItem from "@/components/delete-table-item";
import TableHead from "@/components/table-head";
import { formatDate } from "@/lib/utils";
import User from "@/schemas/User";

interface Props {
  data: User[];
  count: number;
}

const columns = [
  { _id: 1, value: "firstName", label: "First Name" },
  { _id: 2, value: "lastName", label: "Last Name" },
  { _id: 3, value: "email", label: "Email" },
  { _id: 4, value: "role", label: "Role" },
  { _id: 5, value: "createdAt", label: "Date" },
  { _id: 6, value: "", label: "Action" },
];

export default function UserTable({ data, count }: Props) {
  return (
    <div>
      <table className="table">
        <TableHead columns={columns} />
        <tbody>
          {data.map((user) => (
            <tr key={user._id}>
              <td> {user.firstName} </td>
              <td> {user.lastName} </td>
              <td> {user.email} </td>
              <td> {user.role}</td>
              <td> {formatDate(user.createdAt)} </td>
              <td className="space-x-1">
                <DeleteTableItem count={count} id={user._id} path="/users" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
