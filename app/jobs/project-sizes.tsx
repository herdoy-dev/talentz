import { Checkbox, Flex } from "@radix-ui/themes";
import Filter from "./filter";

export default function ProjectSizes() {
  return (
    <Filter title="Project Size">
      <Flex align="center" gap="3">
        <Checkbox /> <span>Learge</span>
      </Flex>
      <Flex align="center" gap="3">
        <Checkbox /> <span>Medium</span>
      </Flex>
      <Flex align="center" gap="3">
        <Checkbox /> <span>Small</span>
      </Flex>
    </Filter>
  );
}
