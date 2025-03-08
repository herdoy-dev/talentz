import { Checkbox, Flex } from "@radix-ui/themes";
import Filter from "./filter";

export default function ClientHireRate() {
  return (
    <Filter title="Client Hire Rate">
      <Flex align="center" gap="3">
        <Checkbox /> <span>Never Hire Anyone </span>
      </Flex>
      <Flex align="center" gap="3">
        <Checkbox /> <span>1 to 10</span>
      </Flex>
      <Flex align="center" gap="3">
        <Checkbox /> <span>10 +</span>
      </Flex>
    </Filter>
  );
}
