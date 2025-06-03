import Badge from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Flex } from "@radix-ui/themes";
import Link from "next/link";

const actions = [
  {
    id: 1,
    title: "Website Design - Figma",
  },
  {
    id: 2,
    title:
      "Looking for a creative UX/UI designer to redesign our website landing page in figma",
  },
  { id: 3, title: "History research proofreading and editing" },
];

function RequestActions() {
  return (
    <div className="border rounded-3xl p-6">
      <Flex align="center" justify="between" mb="3">
        <p className="!text-xl font-semibold text-primary-dark">
          Request Action
        </p>
        <Link
          href="/buyer"
          className="underline font-semibold text-primary-dark"
        >
          View All
        </Link>
      </Flex>

      <div className="space-y-3">
        {actions.map((item, index) => (
          <div
            className={cn(
              "space-y-3 pb-3",
              actions.length - 1 !== index && "border-b border-[#333]"
            )}
            key={item.id}
          >
            <Flex align="center" gap="2">
              <Badge className="bg-yellow text-primary-dark">
                New Application
              </Badge>
            </Flex>
            <p>
              Designer interview- For UX designer, product designer, user
              researcher, UI designer
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RequestActions;
