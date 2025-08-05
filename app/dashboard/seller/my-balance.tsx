"use client";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import useMe from "@/hooks/useMe";
import Link from "next/link";

function MyBalance() {
  const { data } = useMe();
  if (!data) return null;
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <p>My Balance</p>
        <Link
          href="/dashboard/seller/earnings"
          className={buttonVariants({ variant: "link" })}
        >
          View Wallet
        </Link>
      </div>
      <h3> ${data.data.walletBalance} </h3>
    </Card>
  );
}

export default MyBalance;
