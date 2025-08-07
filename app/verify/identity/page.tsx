import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { FaChevronRight, FaPassport, FaRegIdCard } from "react-icons/fa6";

function IdentityVerificationPage() {
  return (
    <div className="flex items-center justify-center h-[calc(100dvh-70px)]">
      <div className="flex items-center justify-center flex-col gap-6 w-[300px] md:w-[400px]">
        <div className="text-center">
          <h2>Verify Your Identity</h2>
          <p>Select type of document you would like to upload</p>
        </div>
        <Card className="w-full">
          <Link
            href="/verify/identity/passport"
            className="px-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#AAEBCA4D]">
                <FaPassport />
              </div>
              <span>Passport</span>
            </div>
            <FaChevronRight />
          </Link>
        </Card>
        <Card className="w-full">
          <Link
            href="/verify/identity/id"
            className="px-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#AAEBCA4D]">
                <FaRegIdCard />
              </div>
              <span>ID Card</span>
            </div>
            <FaChevronRight />
          </Link>
        </Card>
        <Link className={buttonVariants({ variant: "link" })} href="/dashboard">
          Skip For Now
        </Link>
      </div>
    </div>
  );
}

export default IdentityVerificationPage;
