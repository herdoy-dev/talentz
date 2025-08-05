"use client";
import { buttonVariants } from "@/components/ui/button";
import useCategorys from "@/hooks/useCategory";
import { Flex } from "@radix-ui/themes";
import Link from "next/link";
import CategoryTable from "./category-table";

export default function Categorys() {
  const { data } = useCategorys();
  if (!data) return <div></div>;

  return (
    <div className="space-y-6">
      <Flex align="center" justify="between">
        <div></div>
        <div>
          <Link className={buttonVariants()} href="/admin/categorys/new">
            Create New Category
          </Link>
        </div>
      </Flex>

      <div>
        <CategoryTable data={data.data} />
      </div>
    </div>
  );
}
