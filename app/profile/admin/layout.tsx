import getSession from "@/actions/get-session";
import Navbar from "@/components/navbar";
import Container from "@/components/ui/container";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

export const dynamic = "force-dynamic";

export default async function AdminProfileLayout({
  children,
}: PropsWithChildren) {
  const session = await getSession();
  if (session && session.role !== "admin") return redirect("/");
  return (
    <>
      <Navbar />
      <Container>
        <div className="p-4">{children}</div>
      </Container>
    </>
  );
}
