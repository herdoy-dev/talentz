"use client";

import { queryClient } from "@/app/query-client-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useMe from "@/hooks/useMe";
import useMyWithdraws from "@/hooks/useMyWithdraws";
import { formatDate } from "@/lib/utils";
import apiClient from "@/services/api-client";
import { AxiosError } from "axios";
import { Banknote, DollarSign, History, Plus, Wallet } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaWallet } from "react-icons/fa6";
import { SiPaypal } from "react-icons/si";

type PaymentMethod = {
  id: string;
  name: string;
  icon: React.ReactNode;
};

const paymentMethods: PaymentMethod[] = [
  { id: "PAYPAL", name: "PayPal", icon: <SiPaypal className="w-5 h-5" /> },
  {
    id: "BANK",
    name: "Bank Transfer",
    icon: <Banknote className="w-5 h-5" />,
  },
];

export default function EarningsPage() {
  const { data: userData, isLoading, error } = useMe();
  const [withdrawAmount, setWithdrawAmount] = useState<string>("");
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const { data } = useMyWithdraws();

  if (isLoading)
    return <div className="container mx-auto py-8">Loading...</div>;
  if (error)
    return <div className="container mx-auto py-8">Error loading data</div>;
  if (!userData) return null;

  const handleWithdraw = async () => {
    try {
      const amount = parseFloat(withdrawAmount);

      if (!selectedMethod) {
        toast.error("Please select a payment method");
        return;
      }

      if (isNaN(amount) || amount <= 0) {
        toast.error("Please enter a valid amount");
        return;
      }

      if (amount > userData.data.walletBalance) {
        toast.error("Insufficient balance");
        return;
      }

      await apiClient.post("/withdraws", {
        amount,
        paymentMethod: selectedMethod,
      });

      toast.success(`Withdrawal request for $${amount.toFixed(2)} submitted`);
      setWithdrawAmount("");
      setSelectedMethod("");
      queryClient.invalidateQueries({ queryKey: ["me"] });
      queryClient.invalidateQueries({ queryKey: ["my_withdraws"] });
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        return toast.error(error.response.data.message);
      }
      toast.error("Oops! Something went wrong. Please try again.");
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setWithdrawAmount(value);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Earnings Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Available Balance */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Available Balance
            </CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${userData.data.walletBalance.toFixed(2)}
            </div>
            <Button className="mt-4" variant="outline">
              <FaWallet className="mr-2 h-4 w-4" /> Withdraw
            </Button>
          </CardContent>
        </Card>

        {/* Pending Clearance */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Clearance
            </CardTitle>
            <History className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$0.00</div>
            <p className="text-xs text-muted-foreground mt-1">
              No pending clearance at this time
            </p>
          </CardContent>
        </Card>

        {/* Lifetime Earnings */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Lifetime Earnings
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${userData.data.walletBalance.toFixed(2)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Withdrawal Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Withdraw Funds</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Select
                  value={selectedMethod}
                  onValueChange={setSelectedMethod}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    {paymentMethods.map((method) => (
                      <SelectItem key={method.id} value={method.id}>
                        <div className="flex items-center">
                          {method.icon}
                          <span className="ml-2">{method.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Input
                  value={withdrawAmount}
                  onChange={handleAmountChange}
                  placeholder="Amount to withdraw"
                  type="text"
                  inputMode="decimal"
                />
              </div>
            </div>
            <Button
              className="w-full md:w-auto"
              onClick={handleWithdraw}
              disabled={!selectedMethod || !withdrawAmount}
            >
              <FaWallet className="mr-2 h-4 w-4" /> Request Withdrawal
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Add Payment Method */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Payment Methods</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4">
              {paymentMethods.map((method) => (
                <Card key={method.id} className="p-4 flex items-center">
                  {method.icon}
                  <span className="ml-2">{method.name}</span>
                </Card>
              ))}
              <Button variant="outline">
                <Plus className="mr-2 h-4 w-4" /> Add Payment Method
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transaction History */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data && data.count > 0 ? (
                data.data.map((transaction) => (
                  <TableRow key={transaction._id}>
                    <TableCell>{formatDate(transaction.createdAt)}</TableCell>
                    <TableCell>{transaction.paymentMethod}</TableCell>
                    <TableCell className="text-right">
                      ${transaction.amount.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          transaction.status === "COMPLETED"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {transaction.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8">
                    No transactions yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
