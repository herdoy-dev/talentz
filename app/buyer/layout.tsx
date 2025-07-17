import { SidebarProvider } from "@/components/ui/sidebar";
import { PropsWithChildren } from "react";
import BuyerNavbar from "./navbar";
import BuyerSidebar from "./sidebar";

export default function BuyerLayout({ children }: PropsWithChildren) {
  return (
    <SidebarProvider>
      <BuyerSidebar />
      <main>
        <BuyerNavbar />
        {children}
      </main>
    </SidebarProvider>
  );
}
