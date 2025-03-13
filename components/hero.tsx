import ActionButtons from "./action-buttons";
import SearchBoxPandingPage from "./search-box-landing-page";
import Container from "./ui/container";

export default function Hero() {
  return (
    <Container className="flex items-center justify-center my-16">
      <div className="max-w-[663px] flex items-center justify-center flex-col gap-8">
        <h1 className="text-center px-6 md:px-0">
          Connect with Top Talent or Find Your Dream Freelance Job!
        </h1>
        <SearchBoxPandingPage />
        <div className="max-w-[424px] flex flex-col gap-6">
          <p className="text-center">
            Bridging the gap between skilled freelancers and forward-thinking
            employers. Let's grow together!
          </p>
        </div>
        <ActionButtons className="justify-center" />
      </div>
    </Container>
  );
}
