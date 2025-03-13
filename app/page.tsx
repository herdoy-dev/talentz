import HeroIllustrations from "@/app/hero-illustrations";
import Navbar from "@/components/navbar";
import Hero from "./hero";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <HeroIllustrations />
    </>
  );
}
