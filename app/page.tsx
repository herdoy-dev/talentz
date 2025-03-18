import CallToAction from "@/components/call-to-action";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Hero from "./hero";
import HeroIllustrations from "./hero-illustrations";
import SimpleSteps from "./simple-steps";
import Testimonials from "./testimonials";
import WhyChooseUs from "./why-choose-us";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <HeroIllustrations />
      <SimpleSteps />
      <WhyChooseUs />
      <Testimonials />
      <CallToAction />
      <Contact />
      <Footer />
    </>
  );
}
