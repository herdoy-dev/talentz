import Job from "./job";
import JobActions from "./job-actions";

export default function Jobs() {
  return (
    <div>
      <JobActions />
      <div className="py-8 px-4 space-y-8">
        <Job />
        <Job />
        <Job />
        <Job />
        <Job />
        <Job />
        <Job />
        <Job />
        <Job />
      </div>
    </div>
  );
}
