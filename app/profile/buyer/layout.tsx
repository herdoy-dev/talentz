import LogoNavbar from "@/components/logoNav";
import Container from "@/components/ui/container";
import { PropsWithChildren } from "react";

export default function BuyerProfileLayout({ children }: PropsWithChildren) {
  return (
    <>
      <LogoNavbar />
      <Container>
        <div className="p-4">{children}</div>
      </Container>
    </>
  );
}
