import { Button } from "./button";
import Container from "./ui/container";

export default function NextSkip() {
  return (
    <>
      <div className="h-20"></div>
      <div className="shadow-2xl shadow-dark fixed bottom-0 w-full left-0 bg-white">
        <Container className="flex items-center justify-between h-20">
          <p className="underline text-primary cursor-pointer">Skip For Now</p>
          <Button className="px-15" variant="outline">
            Next
          </Button>
        </Container>
      </div>
    </>
  );
}
