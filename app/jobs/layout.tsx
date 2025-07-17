import CallToAction from "@/components/call-to-action";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import JobFilters from "@/components/job-filters";
import Navbar from "@/components/navbar";
import Container from "@/components/ui/container";
import { PropsWithChildren } from "react";

export default function JobPageLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Navbar />
      <Container>
        <h2 className="my-6">Opening Jobs</h2>
      </Container>
      <Container className="flex flex-col md:flex-row items-start justify-between mb-16">
        <div className="w-full md:w-[300px]">
          <JobFilters />
        </div>
        <div className="flex-1 px-3">{children}</div>
      </Container>
      <CallToAction />
      <Contact />
      <Footer />
    </>
  );
}
