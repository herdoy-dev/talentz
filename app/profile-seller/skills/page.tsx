import NextSkip from "@/components/next-skip";
import AddSkills from "./add-skills";
import AddLanguages from "./add-languages";

export default function SkillsLanguages() {
  return (
    <div className="mb-30">
      <h2 className="text-primary">Skills & Languages</h2>
      <AddSkills />
      <AddLanguages />
      <NextSkip next="/profile-seller/educations" />
    </div>
  );
}
