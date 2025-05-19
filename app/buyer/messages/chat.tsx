import { cn } from "@/lib/utils";
import { Avatar, Flex } from "@radix-ui/themes";

interface Props {
  current: number;
  setCurrent: () => void;
}

export default function Chat({ current, setCurrent }: Props) {
  return (
    <Flex
      onClick={setCurrent}
      align="center"
      p="2"
      className={cn(
        "border cursor-pointer rounded-xl",
        3 == current && "bg-primary-light"
      )}
      gap="2"
    >
      <Avatar src="/me.jpg" fallback="User" radius="full" size="4" />
      <div>
        <p className="font-semibold">Herdoy Almamun</p>
        <p className="!text-[12px] text-gray-400">Lorem ipsum dolor...</p>
      </div>
    </Flex>
  );
}
