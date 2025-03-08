import { Flex } from "@radix-ui/themes";
import { ReactNode } from "react";
import { FiMinus } from "react-icons/fi";

interface Props {
  title: string;
  children: ReactNode;
}

export default function Filter({ title, children }: Props) {
  return (
    <div className="border p-2 space-y-3 rounded-md">
      <Flex align="center" justify="between" className="w-full">
        <h3> {title} </h3>
        <FiMinus />
      </Flex>
      {children}
    </div>
  );
}
