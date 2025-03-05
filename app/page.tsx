import { Container } from "@radix-ui/themes";
import Hero from "./hero";
import Navbar from "./navbar";
import Steps from "./steps";

export default function Home() {
  return (
    <>
      <Navbar />
      <Container className="px-3">
        <Hero />
        <Steps />
      </Container>
    </>
  );
}
