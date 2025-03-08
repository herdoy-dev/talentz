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
      <JobCategorys />
      <JobTypes />
      <ExperienceLevels />
      <ClientHireRate />
      <ClientLocation />
      <ProjectLength />
      <ProjectSizes />
    </div>
  );
}
