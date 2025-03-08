import { Checkbox, Flex } from "@radix-ui/themes";
import Filter from "./filter";

export default function ProjectLength() {
  return (
    <Filter title="Project Length">
      <Flex align="center" gap="3">
        <Checkbox /> <span>More than 6 months</span>
      </Flex>
      <Flex align="center" gap="3">
        <Checkbox /> <span>3-6 months</span>
      </Flex>
      <Flex align="center" gap="3">
        <Checkbox /> <span>1-3 months</span>
      </Flex>
    </Filter>
  );
}
