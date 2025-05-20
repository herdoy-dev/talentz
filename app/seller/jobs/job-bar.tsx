"use client";
import { cn } from "@/lib/utils";
import { Flex } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CgNotes } from "react-icons/cg";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoBriefcaseOutline } from "react-icons/io5";

const items = [
  {
    id: "1",
    label: "In Progress Jobs",
    path: "/seller/jobs",
    icon: <IoBriefcaseOutline />,
  },
  {
    id: "2",
    label: "Open Jobs",
    path: "/seller/jobs/open",
    icon: <CgNotes />,
  },
  {
    id: "3",
    label: "Completed Jobs",
    path: "/seller/jobs/completed",
    icon: <FaRegCheckCircle />,
  },
];

export default function JobBar() {
  const currentPath = usePathname();
  return (
    <Flex align="center" gap="6" className="border-b-2 pb-2">
      {items.map((i) => (
        <Link
          href={i.path}
          key={i.id}
          className={cn(
            "relative",
            i.path === currentPath && "text-primary-dark font-semibold"
          )}
        >
          <Flex align="center" gap="2">
            {i.icon} <p> {i.label} </p>
          </Flex>
          {i.path === currentPath && (
            <div className="absolute -bottom-[10px] start-0 w-full h-1 bg-primary-dark" />
          )}
        </Link>
      ))}
    </Flex>
  );
}
