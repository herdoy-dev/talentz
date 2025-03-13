import Navbar from "@/components/navbar";
import Hero from "./_components/hero";
import HeroIllustrations from "./_components/hero-illustrations";
import SimpleSteps from "./_components/simple-steps";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <HeroIllustrations />
      <SimpleSteps />
    </>
  );
}
