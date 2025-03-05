import { Container } from "@radix-ui/themes";
import Hero from "./hero";
import Navbar from "./navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <Container className="px-3">
        <Hero />
      </Container>
    </>
  );
}
