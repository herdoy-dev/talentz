import { Container } from "@radix-ui/themes";
import Hero from "./hero";
import Navbar from "./navbar";
import Steps from "./steps";
import Why from "./why";
import Testimonials from "./testimonials";
import Action from "./action";
import { Contact } from "./contact";
import Footer from "./footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Container className="px-3">
        <Hero />
        <Steps />
        <Why />
        <Testimonials />
        <Action />
        <Contact />
      </Container>
      <Footer />
    </>
  );
}
