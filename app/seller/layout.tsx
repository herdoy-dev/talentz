import { PropsWithChildren } from "react";
import SellerNavbar from "./navbar";
import SellerSidebar from "./sidebar";

export default function SellerLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <SellerNavbar />
      <div className="flex flex-1 overflow-hidden">
        <SellerSidebar />
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6 px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
