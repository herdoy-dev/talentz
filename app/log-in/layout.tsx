import Navbar from "@/components/navbar";
import Container from "@/components/ui/container";
import { PropsWithChildren } from "react";

export default function LoginPageLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Navbar />
      <Container>{children}</Container>
    </>
  );
}
