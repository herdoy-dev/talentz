import { Container, Grid } from "@radix-ui/themes";
import { PropsWithChildren } from "react";
import Action from "../action";
import { Contact } from "../contact";
import Footer from "../footer";
import Navbar from "../navbar";
import Sidebar from "./sidebar";

export default function layout({ children }: PropsWithChildren) {
  return (
    <>
      <Navbar />
      <Container className="py-4 h-[calc(100dvh-70px)] overflow-auto px-3">
        <Grid columns={{ initial: "1", md: "300px 1fr" }} gap="8">
          <Sidebar />
          {children}
        </Grid>
        <Action />
        <Contact />
      </Container>
      <Footer />
    </>
  );
}
