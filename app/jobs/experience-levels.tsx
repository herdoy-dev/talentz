import { Checkbox, Flex } from "@radix-ui/themes";
import Filter from "./filter";

export default function ExperienceLevels() {
  return (
    <Filter title="Experience Lavel">
      <Flex align="center" gap="3">
        <Checkbox /> <span>Entry Level </span>
      </Flex>
      <Flex align="center" gap="3">
        <Checkbox /> <span>Intermediate </span>
      </Flex>
      <Flex align="center" gap="3">
        <Checkbox /> <span>Expert</span>
      </Flex>
    </Filter>
  );
}
