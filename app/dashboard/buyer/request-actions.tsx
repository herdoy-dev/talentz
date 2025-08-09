"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import useAllComments from "@/hooks/useAllComments";
import { cn, formatDate } from "@/lib/utils";
import { Flex } from "@radix-ui/themes";
import { AlertCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function NewActions() {
  const { data, isLoading } = useAllComments();
  const router = useRouter();

  return (
    <Card
      className="cursor-pointer transition-all hover:shadow-md hover:border-primary/20"
      onClick={() => router.push("/dashboard/buyer/jobs")}
    >
      <CardHeader>
        <Flex align="center" justify="between">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <AlertCircle className="h-5 w-5 text-orange-500" />
            Required Actions
          </CardTitle>
          <Link
            href="/dashboard/buyer"
            className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </Flex>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-full" />
                {i < 2 && <div className="border-b border-gray-200 pt-2" />}
              </div>
            ))}
          </div>
        ) : !data ? (
          <div className="flex flex-col items-center justify-center py-4 text-center text-gray-500">
            Failed to load actions
          </div>
        ) : data.data.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-4 text-center">
            <p className="text-gray-500">No pending actions</p>
          </div>
        ) : (
          <div className="space-y-4">
            {data.data.map((item, index) => (
              <div
                key={item._id}
                className={cn(
                  "space-y-2",
                  index < data.data.length - 1 &&
                    "border-b border-gray-200 pb-4"
                )}
              >
                <Flex align="center" gap="2">
                  <p className="text-sm text-gray-500">
                    {formatDate(item.createdAt)}
                  </p>
                  <Badge
                    variant="secondary"
                    className="bg-orange-100 text-orange-800"
                  >
                    Action Required
                  </Badge>
                </Flex>
                <p className="text-sm text-gray-700 line-clamp-2">
                  {item.message.slice(0, 120)}
                  {item.message.length > 120 && "..."}
                </p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default NewActions;
