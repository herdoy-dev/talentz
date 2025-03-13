import Container from "@/components/ui/container";
import Image from "next/image";

export default function HeroIllustrations() {
  return (
    <Container className="flex items-center justify-between py-5">
      <Image
        src="/hero_illustration_left.png"
        width={714}
        height={396}
        alt="hero illustration"
        className="max-w-full flex-1 h-full hidden md:block"
      />

      <Image
        src="/hero_illustration_right.png"
        width={714}
        height={396}
        alt="hero illustration"
        className="max-w-full flex-1 h-full"
      />
    </Container>
  );
}
