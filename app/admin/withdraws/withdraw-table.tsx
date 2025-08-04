import TableHead from "@/components/table-head";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import Withdraw from "@/schemas/Withdraw";
import { Flex } from "@radix-ui/themes";
import WithdrawActions from "./withdraw-actions";
import { WithdrawDetails } from "./withdraw-details";

interface Props {
  data: Withdraw[];
  count: number;
}

const columns = [
  { _id: 1, value: "paymentMethod", label: "Payment Methood" },
  { _id: 3, value: "amount", label: "Amount" },
  { _id: 4, value: "user.firstName", label: "User" },
  { _id: 5, value: "createdAt", label: "Date" },
  { _id: 6, value: "", label: "Actions" },
];

export default function WithdrawTable({ data }: Props) {
  return (
    <div>
      <WithdrawActions />
      <table className="table">
        <TableHead columns={columns} />
        <tbody>
          {data.map((job) => (
            <tr key={job._id}>
              <td> {job.paymentMethod.methodType} </td>
              <td> ${job.amount} </td>
              <td> {job.user.firstName + " " + job.user.lastName} </td>
              <td> {formatDate(job.createdAt)} </td>
              <td className="space-x-1">
                {job.status === "COMPLETED" && (
                  <Button size="sm" variant="light" disabled>
                    Completed
                  </Button>
                )}
                {job.status !== "COMPLETED" && job.status !== "FAILED" && (
                  <Flex gap="2">
                    <WithdrawDetails withdraw={job} />
                    <Button size="sm" variant="destructive">
                      Mark as Failed
                    </Button>
                  </Flex>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
