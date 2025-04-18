import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface Props {
  className?: string;
  isAllSecondary?: boolean;
}

export default function ActionButtons({ className, isAllSecondary }: Props) {
  return (
    <div
      className={cn(
        "w-full flex items-center gap-5 flex-col md:flex-row",
        className
      )}
    >
      <Button className="w-full md:w-auto">Join as a Freelancer</Button>
      <Button
        className="w-full md:w-auto"
        variant={isAllSecondary ? "default" : "dark"}
      >
        Hire a Freelancer
      </Button>
    </div>
  );
}
