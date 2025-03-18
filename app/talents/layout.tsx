import CallToAction from "@/components/call-to-action";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { PropsWithChildren } from "react";

export default function TalentpageLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Navbar />
      {children}
      <CallToAction />
      <Contact />
      <Footer />
    </>
  );
}
