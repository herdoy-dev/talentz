import { Checkbox, Flex } from "@radix-ui/themes";
import Filter from "./filter";

export default function JobTypes() {
  return (
    <Filter title="Job Types">
      <Flex align="center" gap="3">
        <Checkbox /> <span>Full Time</span>
      </Flex>
      <Flex align="center" gap="3">
        <Checkbox /> <span>Part Time</span>
      </Flex>
    </Filter>
  );
}
