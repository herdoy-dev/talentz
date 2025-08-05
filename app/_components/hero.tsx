import ActionButtons from "@/components/action-buttons";
import Container from "@/components/ui/container";
import SearchBox from "./search-box";

export default function Hero() {
  return (
    <Container className="flex items-center justify-center my-16">
      <div
        className="max-w-[663px] flex items-center justify-center flex-col gap-8"
        id="how-we-work"
      >
        <h1 className="text-center px-6 md:px-0">
          Connect with Top Talent or Find Your Dream Freelance Job!
        </h1>
        <SearchBox />
        <div className="max-w-[424px] flex flex-col gap-6">
          <p className="text-center">
            Bridging the gap between skilled freelancers and forward-thinking
            employers. Let&apos;s grow together!
          </p>
        </div>
        <ActionButtons className="justify-center" />
      </div>
    </Container>
  );
}
