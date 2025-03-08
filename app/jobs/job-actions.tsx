import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Flex } from "@radix-ui/themes";
import { FaMagnifyingGlass } from "react-icons/fa6";

export default function JobActions() {
  return (
    <Flex align="center" gap="4">
      <Select>
        <SelectTrigger className="rounded-full">
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="usa">Post Time</SelectItem>
          <SelectItem value="china">Asc</SelectItem>
          <SelectItem value="canada">Desc</SelectItem>
        </SelectContent>
      </Select>
      <div className="flex items-center justify-between px-2 border border-gray-600 rounded-full md:w-[300px]">
        <Input placeholder="Search for jobs..." className="border-none" />{" "}
        <FaMagnifyingGlass />
      </div>
    </Flex>
  );
}
