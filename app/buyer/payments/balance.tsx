"use client";

import { Button } from "@/components/ui/button";
import useBalance from "@/hooks/useBalance";
import useMe from "@/hooks/useMe";
import { Flex, Grid } from "@radix-ui/themes";
import Image from "next/image";

export default function MyBalance() {
  const { data } = useBalance();
  const { data: user } = useMe();
  if (!user) return null;
  return (
    <Grid columns="2fr 3fr" gap="5">
      <div className="border shadow rounded-2xl p-4">
        <h4>My Balance</h4>
        <h2> {data ? data.balance : 0} </h2>
      </div>
      <div className="border shadow rounded-2xl p-4 space-y-3">
        <h4>Payment Method</h4>
        <Flex align="center" gap="3">
          <Image
            src="/paypal.png"
            width={100}
            height={50}
            className="max-w-[100px] h-full"
            alt="paypal"
          />
          <div>
            <p className="font-semibold !text-[15px]"> {user.email} </p>
            <p className="text-gray-500 !text-[12px]"> Expire 03/2028 </p>
          </div>
        </Flex>
        <Button variant="outline" size="sm" className="px-8">
          Update
        </Button>
      </div>
    </Grid>
  );
}
