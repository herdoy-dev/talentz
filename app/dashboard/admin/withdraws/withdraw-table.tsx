"use client";
import TableHead from "@/components/table-head";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import ApiResponse from "@/schemas/ApiRespose";
import Withdraw from "@/schemas/Withdraw";
import apiClient from "@/services/api-client";
import { Flex } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
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
  const router = useRouter();
  return (
    <div>
      <WithdrawActions />
      <table className="table">
        <TableHead columns={columns} />
        <tbody>
          {data.map((withdraw) => (
            <tr key={withdraw._id}>
              <td> {withdraw.paymentMethod.methodType} </td>
              <td> ${withdraw.amount} </td>
              <td>
                {" "}
                {withdraw.user.firstName + " " + withdraw.user.lastName}{" "}
              </td>
              <td> {formatDate(withdraw.createdAt)} </td>
              <td className="space-x-1">
                {withdraw.status === "COMPLETED" && (
                  <Button size="sm" variant="light" disabled>
                    Completed
                  </Button>
                )}
                {withdraw.status !== "COMPLETED" &&
                  withdraw.status !== "FAILED" && (
                    <Flex gap="2">
                      <WithdrawDetails withdraw={withdraw} />
                      <Button
                        onClick={async () => {
                          const { data } = await apiClient.post<
                            ApiResponse<string>
                          >("/withdraws/cancel", { withdrawId: withdraw._id });
                          toast.success(data.message);
                          router.refresh();
                        }}
                        size="sm"
                        variant="destructive"
                      >
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
