import getSession from "@/actions/get-session";
import LogoNavbar from "@/components/logoNav";
import Container from "@/components/ui/container";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

export const dynamic = "force-dynamic";

export default async function BuyerProfileLayout({
  children,
}: PropsWithChildren) {
  const session = await getSession();
  if (session && session.role !== "client") return redirect("/");
  return (
    <>
      <LogoNavbar />
      <Container>
        <div className="p-4">{children}</div>
      </Container>
    </>
  );
}
