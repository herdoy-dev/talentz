import getSession from "@/actions/get-session";
import LogoNavbar from "@/components/logoNav";
import Container from "@/components/ui/container";
import { Grid } from "@radix-ui/themes";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";
import SellerProfileSidebar from "./sidebar";

export const dynamic = "force-dynamic";

export default async function SellerProfileLayout({
  children,
}: PropsWithChildren) {
  const session = await getSession();
  if (session && session.role !== "freelancer") return redirect("/");
  return (
    <>
      <LogoNavbar />
      <Container>
        <Grid columns={{ initial: "1", md: "300px 1fr" }} className="mb-20">
          <SellerProfileSidebar />
          <div className="p-4">{children}</div>
        </Grid>
      </Container>
    </>
  );
}
