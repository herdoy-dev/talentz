import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import JobFilterBox from "./job-filter-box";

export default function JobFilters() {
  return (
    <div className="w-full px-2 space-y-6">
      <JobFilterBox title="Budget">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="budget" />
            <label
              htmlFor="budget"
              className="text-sm font-medium leading-none"
            >
              Fixed Package
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="custom" />
            <label
              htmlFor="custom"
              className="text-sm font-medium leading-none"
            >
              Custom Offer
            </label>
          </div>
          <div className="flex items-center gap-2">
            <Input className="py-1" placeholder="Min" />
            <div className="w-7 bg-gray h-[1.5px]" />
            <Input className="py-1" placeholder="Max" />
          </div>
        </div>
      </JobFilterBox>
      <JobFilterBox title="Job Category">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="design" />
            <label
              htmlFor="design"
              className="text-sm font-medium leading-none"
            >
              Design
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="engineering" />
            <label
              htmlFor="engineering"
              className="text-sm font-medium leading-none"
            >
              Engineering
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="community" />
            <label
              htmlFor="community"
              className="text-sm font-medium leading-none"
            >
              Community Services
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="information" />
            <label
              htmlFor="information"
              className="text-sm font-medium leading-none"
            >
              Information & Technology
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="accounting" />
            <label
              htmlFor="accounting"
              className="text-sm font-medium leading-none"
            >
              Accounting
            </label>
          </div>
        </div>
      </JobFilterBox>
      <JobFilterBox title="Job Type">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="fullTime" />
            <label
              htmlFor="fullTime"
              className="text-sm font-medium leading-none"
            >
              Full Time
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="partTime" />
            <label
              htmlFor="partTime"
              className="text-sm font-medium leading-none"
            >
              Part Time
            </label>
          </div>
        </div>
      </JobFilterBox>
      <JobFilterBox title="Experience Level">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="entry" />
            <label htmlFor="entry" className="text-sm font-medium leading-none">
              Entry Level
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="intermediate" />
            <label
              htmlFor="intermediate"
              className="text-sm font-medium leading-none"
            >
              Intermediate
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="expert" />
            <label
              htmlFor="expert"
              className="text-sm font-medium leading-none"
            >
              Expert
            </label>
          </div>
        </div>
      </JobFilterBox>
      <JobFilterBox title="Client Hire Rate">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="new" />
            <label htmlFor="new" className="text-sm font-medium leading-none">
              Never Hire Anyone
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="enter" />
            <label htmlFor="enter" className="text-sm font-medium leading-none">
              1 to 9 hires
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="pro" />
            <label htmlFor="pro" className="text-sm font-medium leading-none">
              10+ hires
            </label>
          </div>
        </div>
      </JobFilterBox>
      <JobFilterBox title="Client Location">
        <div className="space-y-2">
          <select className="py-2 px-3 border border-primary focus:outline-none w-full rounded-md">
            <option value="use">Usa</option>
            <option value="canada">Canada</option>
            <option value="china">China</option>
          </select>
        </div>
      </JobFilterBox>
      <JobFilterBox title="Project Length">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="long" />
            <label htmlFor="long" className="text-sm font-medium leading-none">
              More than 6 months
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="sort" />
            <label htmlFor="sort" className="text-sm font-medium leading-none">
              3-6 months
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="verySort" />
            <label
              htmlFor="verySort"
              className="text-sm font-medium leading-none"
            >
              1-3 months
            </label>
          </div>
        </div>
      </JobFilterBox>
      <JobFilterBox title="Project Size">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="large" />
            <label htmlFor="large" className="text-sm font-medium leading-none">
              Large
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="medium" />
            <label
              htmlFor="medium"
              className="text-sm font-medium leading-none"
            >
              Medium
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="small" />
            <label htmlFor="small" className="text-sm font-medium leading-none">
              Small
            </label>
          </div>
        </div>
      </JobFilterBox>
    </div>
  );
}
