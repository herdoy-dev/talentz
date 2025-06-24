"use client";

import { Button } from "@/components/ui/button";
import { Flex, Grid } from "@radix-ui/themes";

export default function MyBalance() {
  return (
    <Grid columns="2fr 3fr" gap="5">
      <div className="border shadow rounded-2xl p-4">
        <h4>My Balance</h4>
        <Flex
          align="center"
          justify="center"
          className="border overflow-hidden border-primary rounded-2xl w-[300px]"
        >
          <Button className="px-8 rounded-none">Deposit</Button>
        </Flex>
      </div>
    </Grid>
  );
}
