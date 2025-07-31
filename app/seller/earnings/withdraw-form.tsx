"use client";

import { queryClient } from "@/app/query-client-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useMe from "@/hooks/useMe";
import usePaymentMethods from "@/hooks/usePaymentMethods";
import apiClient from "@/services/api-client";
import { AxiosError } from "axios";
import { Banknote } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaWallet } from "react-icons/fa6";
import { SiPaypal } from "react-icons/si";

interface Props {
  onSuccess?: () => void;
}

type PaymentMethodOption = {
  id: string;
  _id: string;
  name: string;
  icon: React.ReactNode;
  methodType: "bank" | "paypal";
};

function WithdrawForm({ onSuccess }: Props) {
  const { data: userData, isLoading: userLoading, error: userError } = useMe();
  const { data: paymentMethodsData, isLoading: methodsLoading } =
    usePaymentMethods();
  const [withdrawAmount, setWithdrawAmount] = useState<string>("");
  const [selectedMethodId, setSelectedMethodId] = useState<string>("");

  if (userLoading || methodsLoading)
    return <div className="py-4">Loading...</div>;
  if (userError) return <div className="py-4">Error loading user data</div>;
  if (!userData) return null;

  // Transform payment methods data into options
  const paymentMethodOptions: PaymentMethodOption[] =
    paymentMethodsData?.data?.map((method) => ({
      id: method.methodType === "bank" ? "BANK" : "PAYPAL",
      _id: method._id,
      name: method.methodType === "bank" ? "Bank Transfer" : "PayPal",
      icon:
        method.methodType === "bank" ? (
          <Banknote className="w-5 h-5" />
        ) : (
          <SiPaypal className="w-5 h-5" />
        ),
      methodType: method.methodType,
    })) || [];

  const handleWithdraw = async () => {
    try {
      const amount = parseFloat(withdrawAmount);
      const selectedMethod = paymentMethodOptions.find(
        (m) => m._id === selectedMethodId
      );

      if (!selectedMethodId || !selectedMethod) {
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
        paymentMethodType: selectedMethod.methodType,
        paymentMethod: selectedMethod._id,
      });

      toast.success(`Withdrawal request for $${amount.toFixed(2)} submitted`);
      setWithdrawAmount("");
      setSelectedMethodId("");

      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ["me"] });
      queryClient.invalidateQueries({ queryKey: ["my_withdraws"] });
      queryClient.invalidateQueries({ queryKey: ["paymentMethods"] });

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data?.message || "Failed to process withdrawal"
        );
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setWithdrawAmount(value);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <div>
          <Select
            value={selectedMethodId}
            onValueChange={setSelectedMethodId}
            disabled={paymentMethodOptions.length === 0}
          >
            <SelectTrigger>
              <SelectValue
                placeholder={
                  paymentMethodOptions.length === 0
                    ? "No payment methods available"
                    : "Select payment method"
                }
              />
            </SelectTrigger>
            <SelectContent>
              {paymentMethodOptions.map((method) => (
                <SelectItem key={method._id} value={method._id}>
                  <div className="flex items-center">
                    {method.icon}
                    <span className="ml-2">{method.name}</span>
                    {method.methodType === "bank" && (
                      <span className="ml-2 text-xs text-muted-foreground">
                        {method.name}
                      </span>
                    )}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {paymentMethodOptions.length === 0 && (
            <p className="text-sm text-muted-foreground mt-2">
              Please add a payment method first
            </p>
          )}
        </div>

        <div className="max-w-[300px]">
          <Input
            value={withdrawAmount}
            onChange={handleAmountChange}
            placeholder="Amount to withdraw"
            type="text"
            inputMode="decimal"
          />
          <p className="text-sm text-muted-foreground mt-1">
            Available: ${userData.data.walletBalance.toFixed(2)}
          </p>
        </div>
      </div>

      <Button
        className="w-full md:w-auto"
        onClick={handleWithdraw}
        disabled={
          !selectedMethodId ||
          !withdrawAmount ||
          paymentMethodOptions.length === 0
        }
      >
        <FaWallet className="mr-2 h-4 w-4" />
        Request Withdrawal
      </Button>
    </div>
  );
}

export default WithdrawForm;
