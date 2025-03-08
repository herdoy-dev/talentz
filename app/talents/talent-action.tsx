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
export default function TalentAction() {
  return (
    <Flex
      align="center"
      direction={{ initial: "column", md: "row" }}
      gap="4"
      justify="between"
    >
      <div className="flex items-center justify-between px-2 border border-gray-600 rounded-full w-full md:w-[400px]">
        <Input placeholder="Search for talents..." className="border-none" />{" "}
        <FaMagnifyingGlass />
      </div>
      <Flex align="center" gap="4" className="w-full md:w-auto">
        <Select>
          <SelectTrigger className="rounded-full w-full">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="usa">Post Time</SelectItem>
            <SelectItem value="china">Asc</SelectItem>
            <SelectItem value="canada">Desc</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="rounded-full w-full">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="usa">Post Time</SelectItem>
            <SelectItem value="china">Asc</SelectItem>
            <SelectItem value="canada">Desc</SelectItem>
          </SelectContent>
        </Select>
      </Flex>
    </Flex>
  );
}
