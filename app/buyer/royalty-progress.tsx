import { Flex, Slider } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

function RoyaltyProgress() {
  return (
    <div className="p-6 border rounded-3xl bg-white">
      <Flex align="center" justify="between" mb="6">
        <h3>Royalty Progress</h3>
        <Link className="underline text-primary" href="/buyer">
          View Details
        </Link>
      </Flex>
      <div className="space-y-2">
        <p className="!text-sm !text-gray-400">Upgrade to Task Achiever</p>
        <div className="space-y-1">
          <p>by Sign Up and Complete the first task</p>
          <Slider defaultValue={[50]} max={100} step={1} color={"cyan"} />
        </div>
        <p className="text-primary">50% completed</p>
      </div>
    </div>
  );
}

export default RoyaltyProgress;
