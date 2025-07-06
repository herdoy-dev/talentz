"use client";
import { Badge } from "@/components/ui/badge";
import useAllApplications from "@/hooks/useAllApplication";
import { cn, formatDate } from "@/lib/utils";
import { Flex } from "@radix-ui/themes";
import Link from "next/link";
import { useRouter } from "next/navigation";

function NewApplications() {
  const { data } = useAllApplications();
  const router = useRouter();
  if (!data) return null;
  return (
    <div
      className="border rounded-3xl p-6 cursor-pointer bg-white"
      onClick={() => router.push("/buyer/jobs/open")}
    >
      <Flex align="center" justify="between" mb="3">
        <p className="!text-xl font-semibold text-primary-dark">
          New Applications
        </p>
        <Link
          href="/buyer"
          className="underline font-semibold text-primary-dark"
        >
          View All
        </Link>
      </Flex>

      <div className="space-y-3">
        {data.data.map((item, index) => (
          <div
            key={item._id}
            className={cn(
              "space-y-3 pb-3",
              data.data.length - 1 !== index && "border-b border-[#333]"
            )}
          >
            <Flex align="center" gap="2">
              <p className="text-gray-500"> {formatDate(item.createdAt)} </p>
              <Badge className="bg-yellow text-primary-dark">
                New Application
              </Badge>
            </Flex>
            <p>{item.message.slice(0, 80)}...</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewApplications;
