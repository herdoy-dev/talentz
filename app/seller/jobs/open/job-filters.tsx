import Checkbox from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import FilterBox from "./filter-box";

export default function JobFilters() {
  return (
    <div className="w-full px-2 space-y-6">
      <FilterBox title="Budget">
        <div className="space-y-2">
          <Checkbox label="Fixed Package" id="budget" />
          <Checkbox label="Custom Offer" id="custom" />
          <div className="flex items-center gap-2">
            <Input className="py-1" placeholder="Min" />
            <div className="w-7 bg-gray h-[1.5px]" />
            <Input className="py-1" placeholder="Max" />
          </div>
        </div>
      </FilterBox>
      <FilterBox title="Job Category">
        <div className="space-y-2">
          <Checkbox label="Design" id="design" />
          <Checkbox label="Engineering" id="engineering" />
          <Checkbox label="Community Services" id="community" />
          <Checkbox label="Information & Technology" id="information" />
          <Checkbox label="Accounting" id="accounting" />
        </div>
      </FilterBox>
      <FilterBox title="Job Type">
        <div className="space-y-2">
          <Checkbox label="Full Time" id="fullTime" />
          <Checkbox label="Part Time" id="partTime" />
        </div>
      </FilterBox>
      <FilterBox title="Experience Level">
        <div className="space-y-2">
          <Checkbox label="Entry Level" id="entry" />
          <Checkbox label="Intermediate" id="intermediate" />
          <Checkbox label="Expert" id="expert" />
        </div>
      </FilterBox>
      <FilterBox title="Client Hire Rate">
        <div className="space-y-2">
          <Checkbox label="Never Hire Anyone" id="new" />
          <Checkbox label="1 to 9 hires" id="enter" />
          <Checkbox label="10+ hires" id="pro" />
        </div>
      </FilterBox>
      <FilterBox title="Client Location">
        <div className="space-y-2">
          <select className="py-2 px-3 border border-primary focus:outline-none w-full rounded-md">
            <option value="use">Usa</option>
            <option value="canada">Canada</option>
            <option value="china">China</option>
          </select>
        </div>
      </FilterBox>
      <FilterBox title="Project Length">
        <div className="space-y-2">
          <Checkbox label="More than 6 months" id="long" />
          <Checkbox label="3-6 months" id="sort" />
          <Checkbox label="1-3 months" id="verySort" />
        </div>
      </FilterBox>
      <FilterBox title="Project Size">
        <div className="space-y-2">
          <Checkbox label="Large" id="large" />
          <Checkbox label="Medium" id="medium" />
          <Checkbox label="Small" id="small" />
        </div>
      </FilterBox>
    </div>
  );
}
