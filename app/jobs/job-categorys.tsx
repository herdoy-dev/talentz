import { Checkbox, Flex } from "@radix-ui/themes";
import Filter from "./filter";

export default function JobCategorys() {
  return (
    <Filter title="Job Category">
      <Flex align="center" gap="3">
        <Checkbox /> <span>Design</span>
      </Flex>
      <Flex align="center" gap="3">
        <Checkbox /> <span>Development</span>
      </Flex>
      <Flex align="center" gap="3">
        <Checkbox /> <span>Community Services</span>
      </Flex>
      <Flex align="center" gap="3">
        <Checkbox /> <span>Information & Technology</span>
      </Flex>
    </Filter>
  );
}
