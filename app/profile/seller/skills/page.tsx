import AddSkills from "./add-skills";
import AddLanguages from "./add-languages";
import NextSkip from "../../_components/next-skip";

export default function SkillsLanguages() {
  return (
    <div className="mb-30">
      <h2 className="mb-5">Skills & Languages</h2>
      <AddSkills />
      <AddLanguages />
      <NextSkip next="/profile/seller/educations" />
    </div>
  );
}
