import TableHead from "@/components/table-head";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import Transaction from "@/schemas/Transaction";

interface Props {
  data: Transaction[];
  count: number;
}

const columns = [
  { _id: 1, value: "type", label: "Type" },
  { _id: 2, value: "user.firstName", label: "User" },
  { _id: 3, value: "amount", label: "Amount" },
  { _id: 5, value: "createdAt", label: "Date" },
  { _id: 6, value: "", label: "Actions" },
];

export default function SalseTable({ data }: Props) {
  return (
    <div>
      <table className="table">
        <TableHead columns={columns} />
        <tbody>
          {data.map((transaction) => (
            <tr key={transaction._id}>
              <td>{transaction.type} </td>
              <td>
                {" "}
                {transaction.user.firstName +
                  " " +
                  transaction.user.lastName}{" "}
              </td>
              <td> ${transaction.amount} </td>
              <td> {formatDate(transaction.createdAt)} </td>
              <td className="space-x-1">
                {transaction.status === "completed" && (
                  <Button size="sm" variant="light" disabled>
                    Completed
                  </Button>
                )}
                {transaction.status === "pending" && (
                  <Button
                    size="sm"
                    className="bg-orange-300 text-gray-400"
                    disabled
                  >
                    Pending
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
