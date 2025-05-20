import TalentCard from "@/components/talent-card";
import { Grid } from "@radix-ui/themes";

export default function Talents() {
  return (
    <div className="h-[90dvh] overflow-y-scroll">
      <h1 className="my-5">Talents</h1>
      <Grid columns={{ initial: "1", md: "2" }} className="gap-8 md:gap-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <TalentCard key={i} />
        ))}
      </Grid>
    </div>
  );
}
