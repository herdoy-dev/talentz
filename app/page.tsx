import Navbar from "@/components/navbar";
import SearchBoxPandingPage from "@/components/search-box-landing-page";
import Container from "@/components/ui/container";

export default function Home() {
  return (
    <>
      <Navbar />
      <Container className="py-6">
        <SearchBoxPandingPage />
      </Container>
    </>
  );
}
