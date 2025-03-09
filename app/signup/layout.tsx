import { Container } from "@radix-ui/themes";
import { PropsWithChildren } from "react";
import Navbar from "../navbar";

export default function layout({ children }: PropsWithChildren) {
  return (
    <>
      <Navbar />
      <Container className="py-4 overflow-auto px-3">{children}</Container>
    </>
  );
}
