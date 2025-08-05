import CallToAction from "@/components/call-to-action";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
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
      <Contact />
      <Footer />
    </>
  );
}
