import Select from "@/components/select";
import { BiSlider } from "react-icons/bi";
import SearchBox from "./search-box";

const options1 = [
  { id: 1, label: "Option 1", value: "Option1" },
  { id: 2, label: "Option 1", value: "Option1" },
  { id: 3, label: "Option 1", value: "Option1" },
];

const options2 = [
  { id: 1, label: "Option 1", value: "Option1" },
  { id: 2, label: "Option 1", value: "Option1" },
  { id: 3, label: "Option 1", value: "Option1" },
];

export default function TalentActions() {
  return (
    <div className="flex items-center justify-between pb-16">
      <SearchBox />
      <div className="hidden md:flex items-center gap-4">
        <Select options={options1} />
        <Select options={options2} />
      </div>
      <div className="cursor-pointer block md:hidden">
        <BiSlider className="text-2xl" />
      </div>
    </div>
  );
}
