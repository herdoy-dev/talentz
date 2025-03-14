import Navbar from "@/components/navbar";
import Hero from "./_components/hero";
import HeroIllustrations from "./_components/hero-illustrations";
import SimpleSteps from "./_components/simple-steps";
import WhyChooseUs from "./_components/why-choose-us";
import Testimonials from "./_components/testimonials";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <HeroIllustrations />
      <SimpleSteps />
      <WhyChooseUs />
      <Testimonials />
    </>
  );
}
