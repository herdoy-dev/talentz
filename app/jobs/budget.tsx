import { Input } from "@/components/ui/input";
import { Checkbox, Flex } from "@radix-ui/themes";
import Filter from "./filter";

export default function Budget() {
  return (
    <Filter title="Budget">
      <Flex align="center" gap="3">
        <Checkbox /> <span>Fixed Package</span>
      </Flex>
      <Flex align="center" gap="3">
        <Checkbox /> <span>Custom Offer</span>
      </Flex>
      <Flex align="center" gap="3">
        <Input placeholder="Min" />
        <Input placeholder="Max" />
      </Flex>
    </Filter>
  );
}
