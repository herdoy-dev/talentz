"use client";
import { Badge } from "@/components/ui/badge";
import useAllComments from "@/hooks/useAllComments";
import { cn, formatDate } from "@/lib/utils";
import { Flex } from "@radix-ui/themes";
import Link from "next/link";
import { useRouter } from "next/navigation";

function NewActions() {
  const { data } = useAllComments();
  const router = useRouter();
  if (!data) return null;
  return (
    <div className="p-6 bg-white" onClick={() => router.push("/buyer/jobs")}>
      <Flex align="center" justify="between" mb="3">
        <p className="!text-xl font-semibold text-primary-dark">New Actions</p>
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
            className={cn(
              "space-y-1 pb-2",
              data.data.length - 1 !== index && "border-b border-[#333]"
            )}
            key={item._id}
          >
            <Flex align="center" gap="2">
              <p className="text-gray-500"> {formatDate(item.createdAt)} </p>
              <Badge className="bg-yellow text-primary-dark">New Action</Badge>
            </Flex>
            <p className="!text-sm">{item.message.slice(0, 80)}...</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewActions;
