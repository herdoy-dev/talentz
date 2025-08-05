import { Flex } from "@radix-ui/themes";
import WithdrawStatusFilter from "./withdraw-status-filter";

function WithdrawActions() {
  return (
    <Flex align="center" justify="between" pb="4">
      <WithdrawStatusFilter />
    </Flex>
  );
}

export default WithdrawActions;
