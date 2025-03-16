import Job from "./job";

export default function JobsPage() {
  return (
    <div className="space-y-2 md:ps-6">
      {Array.from({ length: 10 }).map((_, i) => (
        <Job key={i} />
      ))}
    </div>
  );
}
