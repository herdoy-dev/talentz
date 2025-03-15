import Navbar from "@/components/navbar";
import CallToAction from "./_components/call-to-action";
import Hero from "./_components/hero";
import HeroIllustrations from "./_components/hero-illustrations";
import SimpleSteps from "./_components/simple-steps";
import Testimonials from "./_components/testimonials";
import WhyChooseUs from "./_components/why-choose-us";

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
    </>
  );
}
