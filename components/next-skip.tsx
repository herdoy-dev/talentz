import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import Container from "./ui/container";

interface Props {
  next: string;
}

export default function NextSkip({ next }: Props) {
  return (
    <>
      <div className="shadow-2xl shadow-dark w-full bg-secondary fixed left-0 bottom-0">
        <Container className="flex items-center justify-between h-20">
          <Link href={next} className={buttonVariants({ variant: "link" })}>
            Skip For Now
          </Link>
          <Link
            href={next}
            className={cn(buttonVariants({ variant: "outline" }), "px-12")}
          >
            Next
          </Link>
        </Container>
      </div>
    </>
  );
}
