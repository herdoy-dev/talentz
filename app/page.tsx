import { Container } from "@radix-ui/themes";
import Hero from "./hero";
import Navbar from "./navbar";
import Steps from "./steps";
import Why from "./why";
import Testimonials from "./testimonials";

export default function Home() {
  return (
    <>
      <Navbar />
      <Container className="px-3">
        <Hero />
        <Steps />
        <Why />
        <Testimonials />
      </Container>
    </>
  );
}
