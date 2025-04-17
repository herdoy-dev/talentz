import NextSkip from "@/components/next-skip";
import { AddEducation } from "./add-education";
import Educations from "./educations";

export default function EducationsPage() {
  return (
    <div>
      <h1 className="text-primary mb-5">Educations</h1>
      <Educations />
      <AddEducation />
      <NextSkip next="/profile-seller/portfolios" />
    </div>
  );
}
