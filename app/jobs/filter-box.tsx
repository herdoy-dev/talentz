import Text from "@/components/ui/text";
import { ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
}

export default function FilterBox({ title, children }: Props) {
  return (
    <div className="rounded-xl p-3 border border-gray-400 relative">
      <div className="absolute top-3 right-3 w-3 h-[2px] bg-black cursor-pointer" />
      <Text className="mb-2 font-semibold"> {title} </Text>
      {children}
    </div>
  );
}
