import Container from "@/components/ui/container";
import TalentActions from "./talent-actions";
import TalentCard from "./talent-card";

export default function Page() {
  return (
    <Container className="py-6 mb-8 md:mb-3">
      <h2 className="text-primary mb-6">Talent</h2>
      <TalentActions />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <TalentCard key={i} />
        ))}
      </div>
    </Container>
  );
}
