import { Button } from "@/components/ui/button";
import { Avatar, Flex } from "@radix-ui/themes";

export default function ChatActions() {
  return (
    <Flex align="center" justify="between" className="border-b shadow px-8">
      <Flex align="center" gap="2">
        <Avatar src="/me.jpg" fallback="User" radius="full" size="4" />
        <p className="font-semibold">Herdoy Alamamun</p>
      </Flex>
      <Button size="sm" className="px-8">
        Hire
      </Button>
    </Flex>
  );
}
