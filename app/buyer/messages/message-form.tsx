import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Flex } from "@radix-ui/themes";
import { BsPaperclip } from "react-icons/bs";
import { LuSendHorizontal } from "react-icons/lu";

export default function MessageForm() {
  return (
    <Flex align="center" className="border-t px-3">
      <Flex align="center" className="w-full h-full">
        <Flex align="center">
          <Button variant="outline" size="sm">
            Custom Offer
          </Button>
          <Button variant="ghost" size="sm" className="cursor-pointer">
            <BsPaperclip />
          </Button>
        </Flex>
        <Input
          placeholder="Type your message"
          className="flex-1 rounded-none "
        />
        <Button className="rounded-none cursor-pointer">
          <LuSendHorizontal />
        </Button>
      </Flex>
    </Flex>
  );
}
