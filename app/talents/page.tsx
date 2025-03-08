import { PaginationDemo } from "@/components/pagination";
import { Container, Grid } from "@radix-ui/themes";
import Action from "../action";
import { Contact } from "../contact";
import Footer from "../footer";
import Navbar from "../navbar";
import TalentAction from "./talent-action";
import TalentCard from "./talent-card";

export default function Talents() {
  return (
    <>
      <Navbar />
      <Container className="px-3">
        <h2 className="py-10">Talents</h2>
        <TalentAction />
        <Grid columns={{ initial: "1", md: "2" }} gap="5" mt="8" mb="3">
          <TalentCard />
          <TalentCard />
          <TalentCard />
          <TalentCard />
          <TalentCard />
        </Grid>
        <PaginationDemo />
        <Action />
        <Contact />
      </Container>
      <Footer />
    </>
  );
}
