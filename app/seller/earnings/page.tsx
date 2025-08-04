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
    <div className="container mx-auto py-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Earnings Dashboard
        </h1>
        <p className="text-muted-foreground">
          View your earnings, payment methods, and withdrawal history
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Available Balance
            </CardTitle>
            <Wallet className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-4">
              ${userData.data.walletBalance.toFixed(2)}
            </div>
            {userPaymentMethods && userPaymentMethods.data.length >= 1 ? (
              <WithdrawFund />
            ) : (
              <AddPaymentMethodDialog />
            )}
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-secondary/5 to-secondary/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Clearance
            </CardTitle>
            <History className="h-5 w-5 text-secondary-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              ${pendingEarnings?.data?.toFixed(2) || "0.00"}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {pendingEarnings?.data
                ? "Will be available soon"
                : "No pending earnings"}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-500/5 to-emerald-500/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Lifetime Earnings
            </CardTitle>
            <DollarSign className="h-5 w-5 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              ${earnings?.data?.toFixed(2) || "0.00"}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              All-time total earnings
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Withdraw Section */}
        <Card>
          <CardHeader className="border-b">
            <CardTitle className="text-lg">Withdraw Funds</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <WithdrawForm />
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card>
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Payment Methods</CardTitle>
              <AddPaymentMethodDialog hideIfExists />
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            {userPaymentMethods?.data?.length ? (
              <div className="space-y-4">
                {userPaymentMethods.data.map((method) => (
                  <Card key={method._id} className="border">
                    <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
                      <div className="flex items-center space-x-3">
                        {method.methodType === "bank" ? (
                          <div className="p-2 rounded-lg bg-primary/10">
                            <Banknote className="h-5 w-5 text-primary" />
                          </div>
                        ) : (
                          <div className="p-2 rounded-lg bg-blue-500/10">
                            <SiPaypal className="h-5 w-5 text-blue-500" />
                          </div>
                        )}
                        <span className="font-medium">
                          {method.methodType === "bank"
                            ? "Bank Account"
                            : "PayPal"}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      {method.methodType === "bank" ? (
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Bank</span>
                            <span>{method.bankName}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Account
                            </span>
                            <span>••••{method.accountNumber?.slice(-4)}</span>
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Email</span>
                          <span>{method.email}</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Wallet className="h-10 w-10 text-muted-foreground mb-3" />
                <h3 className="text-lg font-medium">No payment methods</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Add a payment method to withdraw your earnings
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Transaction History */}
      <Card>
        <CardHeader className="border-b">
          <CardTitle className="text-lg">Withdrawal History</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-6">Date</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="pr-6">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {withdrawals?.data?.length ? (
                withdrawals.data.map((withdrawal) => (
                  <TableRow key={withdrawal._id} className="hover:bg-muted/50">
                    <TableCell className="pl-6 py-4">
                      {formatDate(withdrawal.createdAt)}
                    </TableCell>
                    <TableCell className="capitalize">
                      {withdrawal.paymentMethod.methodType}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      ${withdrawal.amount.toFixed(2)}
                    </TableCell>
                    <TableCell className="pr-6">
                      <Badge
                        variant={
                          withdrawal.status === "COMPLETED"
                            ? "default"
                            : withdrawal.status === "PENDING"
                            ? "secondary"
                            : "destructive"
                        }
                        className="capitalize"
                      >
                        {withdrawal.status.toLowerCase()}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-12">
                    <div className="flex flex-col items-center justify-center">
                      <History className="h-10 w-10 text-muted-foreground mb-3" />
                      <h3 className="text-lg font-medium">
                        No withdrawals yet
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Your withdrawal history will appear here
                      </p>
                    </div>
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
