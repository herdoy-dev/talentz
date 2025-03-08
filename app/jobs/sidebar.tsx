import { Button } from "@/components/ui/button";
import Budget from "./budget";
import ClientHireRate from "./client-hire-rate";
import ClientLocation from "./client-location";
import ExperienceLevels from "./experience-levels";
import JobCategorys from "./job-categorys";
import JobTypes from "./job-types";
import ProjectLength from "./project-length";
import ProjectSizes from "./project-sizes";

export default function Sidebar() {
  return (
    <div className="space-y-6">
      <h2>Opening Jobs</h2>
      <Budget />
      <JobCategorys />
      <JobTypes />
      <ExperienceLevels />
      <ClientHireRate />
      <ClientLocation />
      <ProjectLength />
      <ProjectSizes />
      <Button
        variant="outline"
        className="w-full border-primary font-normal cursor-pointer"
      >
        Clear All
      </Button>
    </div>
  );
}
