import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Filter from "./filter";

export default function ClientLocation() {
  return (
    <Filter title="Client Location">
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Cliet location" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="usa">USA</SelectItem>
          <SelectItem value="china">China</SelectItem>
          <SelectItem value="canada">Canada</SelectItem>
        </SelectContent>
      </Select>
    </Filter>
  );
}
