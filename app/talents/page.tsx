import Container from "@/components/ui/container";
import TalentActions from "./talent-actions";
import TalentCard from "../../components/talent-card";
import { Grid } from "@radix-ui/themes";

export default function Page() {
  return (
    <Container className="py-6 mb-8 md:mb-3">
      <h2 className="text-primary mb-6">Talent</h2>
      <TalentActions />
      <Grid columns={{ initial: "1", md: "2" }} className="gap-8 md:gap-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <TalentCard key={i} />
        ))}
      </Grid>
    </Container>
  );
}
