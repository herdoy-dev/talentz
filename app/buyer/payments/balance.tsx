"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useMe from "@/hooks/useMe";
import { Flex, Grid } from "@radix-ui/themes";
import { useState } from "react";

export default function MyBalance() {
  const [amount, setAmount] = useState<number | null>(null);
  const { data: user } = useMe();
  if (!user) return null;

  return (
    <Grid columns="2fr 3fr" gap="5">
      <div className="border shadow rounded-2xl p-4">
        <h4>My Balance</h4>
        <h2> ${user.walletBalance} </h2>
        <Flex
          align="center"
          justify="center"
          className="border overflow-hidden border-primary rounded-2xl w-[300px]"
        >
          <Input
            value={amount ? amount : ""}
            onChange={(e) => setAmount(parseInt(e.target.value))}
            className="border-none"
            placeholder="Enter Amount"
          />
          <Button className="px-8 rounded-none">Deposit</Button>
        </Flex>
      </div>
    </Grid>
  );
}
