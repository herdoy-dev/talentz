import LogoNavbar from "@/components/logoNav";
import Container from "@/components/ui/container";
import { Grid } from "@radix-ui/themes";
import { PropsWithChildren } from "react";
import SellerProfileSidebar from "./sidebar";

export default function SellerProfileLayout({ children }: PropsWithChildren) {
  return (
    <>
      <LogoNavbar />
      <Container>
        <Grid columns={{ initial: "1", md: "300px 1fr" }}>
          <SellerProfileSidebar />
          <div className="p-4">{children}</div>
        </Grid>
      </Container>
    </>
  );
}
