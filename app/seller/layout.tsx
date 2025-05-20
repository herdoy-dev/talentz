import { PropsWithChildren } from "react";
import BuyerNavbar from "./navbar";
import BuyerSidebar from "./sidebar";

export default function BuyerLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <BuyerNavbar />
      <div className="flex flex-1 overflow-hidden">
        <BuyerSidebar />
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6 px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
