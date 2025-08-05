"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ApiResponse from "@/schemas/ApiRespose";
import Withdraw from "@/schemas/Withdraw";
import apiClient from "@/services/api-client";
import { Banknote, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { SiPaypal } from "react-icons/si";

interface Props {
  withdraw: Withdraw;
}

export function WithdrawDetails({ withdraw }: Props) {
  const [isOpen, setOpen] = useState(false);
  const router = useRouter();
  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2">
          <CheckCircle2 className="h-4 w-4" />
          Pay Now
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md px-2">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-xl font-semibold">
            Payment Details
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-4">
          <Card className="border-border/50 bg-muted/10">
            <CardHeader className="flex flex-row items-center space-x-4 pb-3">
              {withdraw.paymentMethod.methodType === "bank" ? (
                <div className="rounded-lg bg-primary/10 p-2">
                  <Banknote className="h-6 w-6 text-primary" />
                </div>
              ) : (
                <div className="rounded-lg bg-blue-500/10 p-2">
                  <SiPaypal className="h-6 w-6 text-blue-500" />
                </div>
              )}
              <CardTitle className="text-lg font-medium">
                {withdraw.paymentMethod.methodType === "bank"
                  ? "Bank Account Details"
                  : "PayPal Account"}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              {withdraw.paymentMethod.methodType === "bank" ? (
                <div className="space-y-3">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-sm font-medium text-muted-foreground">
                      Account Holder
                    </span>
                    <span className="text-sm font-medium">
                      {withdraw.paymentMethod.accountHolderName}
                    </span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-sm font-medium text-muted-foreground">
                      Account Type
                    </span>
                    <span className="text-sm font-medium capitalize">
                      {withdraw.paymentMethod.accountType}
                    </span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-sm font-medium text-muted-foreground">
                      Bank Name
                    </span>
                    <span className="text-sm font-medium">
                      {withdraw.paymentMethod.bankName}
                    </span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-sm font-medium text-muted-foreground">
                      Routing Number
                    </span>
                    <span className="text-sm font-medium">
                      {withdraw.paymentMethod.routingNumber}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-muted-foreground">
                      Account Number
                    </span>
                    <span className="text-sm font-medium">
                      {withdraw.paymentMethod.accountNumber}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-sm font-medium text-muted-foreground">
                      Email
                    </span>
                    <span className="text-sm font-medium">
                      {withdraw.paymentMethod.email}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-muted-foreground">
                      Status
                    </span>
                    <span className="text-sm font-medium text-green-600">
                      Verified
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="rounded-lg border border-border/50 bg-muted/10 p-4">
            <h3 className="mb-3 text-sm font-medium">Payment Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Amount</span>
                <span className="font-medium"> ${withdraw.amount}.00 </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Fee</span>
                <span className="font-medium">$0.00</span>
              </div>
              <div className="flex justify-between pt-2 text-sm font-semibold">
                <span>Total</span>
                <span>${withdraw.amount}.00</span>
              </div>
            </div>
          </div>
        </div>

        <SheetFooter className="mt-6 flex-row justify-end gap-3">
          <SheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
          <Button
            onClick={async () => {
              const { data } = await apiClient.post<ApiResponse<string>>(
                "/withdraws/approve",
                { withdrawId: withdraw._id }
              );
              toast.success(data.message);
              router.refresh();
              setOpen(false);
            }}
            type="submit"
            className="min-w-24"
          >
            Confirm Payment
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
