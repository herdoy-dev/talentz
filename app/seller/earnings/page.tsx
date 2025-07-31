"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import usePaymentMethods from "@/hooks/usePaymentMethods";
import usePendingEarning from "@/hooks/usePendingEarnings";
import useTotalEarning from "@/hooks/useTotalEarning";
import { formatDate } from "@/lib/utils";
import { Banknote, DollarSign, History, Wallet } from "lucide-react";
import { SiPaypal } from "react-icons/si";
import { AddPaymentMethodDialog } from "./add-payment-method-dialog";
import WithdrawForm from "./withdraw-form";
import WithdrawFund from "./withdraw-fund";

export default function EarningsPage() {
  const { data: userData, isLoading, error } = useMe();
  const { data: withdrawals } = useMyWithdraws();
  const { data: earnings } = useTotalEarning();
  const { data: pendingEarnings } = usePendingEarning();
  const { data: userPaymentMethods } = usePaymentMethods();

  if (isLoading)
    return <div className="container mx-auto py-8">Loading...</div>;
  if (error)
    return <div className="container mx-auto py-8">Error loading data</div>;
  if (!userData) return null;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Earnings Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Available Balance
            </CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">
              ${userData.data.walletBalance.toFixed(2)}
            </div>

            {userPaymentMethods && userPaymentMethods.data.length >= 1 ? (
              <WithdrawFund />
            ) : (
              <AddPaymentMethodDialog />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Clearance
            </CardTitle>
            <History className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${pendingEarnings?.data?.toFixed(2) || "0.00"}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {pendingEarnings?.data
                ? "Pending clearance"
                : "No pending clearance"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Lifetime Earnings
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${earnings?.data?.toFixed(2) || "0.00"}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Withdraw Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Withdraw Funds</CardTitle>
        </CardHeader>
        <CardContent>
          <WithdrawForm />
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Payment Methods</CardTitle>
          <AddPaymentMethodDialog />
        </CardHeader>
        <CardContent>
          {userPaymentMethods?.data?.length ? (
            <div className="grid gap-4 md:grid-cols-2">
              {userPaymentMethods.data.map((method) => (
                <Card key={method._id}>
                  <CardHeader className="flex flex-row items-center space-x-4">
                    {method.methodType === "bank" ? (
                      <Banknote className="h-6 w-6 text-primary" />
                    ) : (
                      <SiPaypal className="h-6 w-6 text-blue-500" />
                    )}
                    <CardTitle className="text-lg">
                      {method.methodType === "bank" ? "Bank Account" : "PayPal"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {method.methodType === "bank" ? (
                      <div className="space-y-2">
                        <p className="text-sm">
                          <span className="font-medium">Bank:</span>{" "}
                          {method.bankName}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Account:</span> ****
                          {method.accountNumber?.slice(-4)}
                        </p>
                      </div>
                    ) : (
                      <p className="text-sm">
                        <span className="font-medium">Email:</span>{" "}
                        {method.email}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Wallet className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No payment methods</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Add a payment method to withdraw funds
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Transaction History */}
      <Card>
        <CardHeader>
          <CardTitle>Withdrawal History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {withdrawals?.data?.length ? (
                withdrawals.data.map((withdrawal) => (
                  <TableRow key={withdrawal._id}>
                    <TableCell>{formatDate(withdrawal.createdAt)}</TableCell>
                    <TableCell className="capitalize">
                      {withdrawal.paymentMethod}
                    </TableCell>
                    <TableCell className="text-right">
                      ${withdrawal.amount.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          withdrawal.status === "COMPLETED"
                            ? "default"
                            : withdrawal.status === "PENDING"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {withdrawal.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8">
                    No withdrawal history yet
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
