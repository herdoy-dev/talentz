import { cn } from "@/lib/utils";

interface Step {
  id: number;
  title: string;
  description: string;
}

interface Props {
  title: string;
  steps: Step[];
  className?: string;
}

export default function Steps({ title, steps, className }: Props) {
  return (
    <div className={cn("space-y-6", className)}>
      <h3 className="text-xl md:text-2xl font-semibold text-gray-900">
        {title}
      </h3>
      <div className="flex flex-col">
        {steps.map((step) => (
          <div
            key={step.id}
            className={cn(
              "flex items-start gap-2 pb-6",
              steps.length !== step.id && "border-l-2 border-gray-300"
            )}
          >
            <div className="-ml-[10px] w-5 h-5 bg-secondary flex items-center justify-center rounded-full text-white text-xs font-semibold">
              {step.id}
            </div>
            <div className="flex-1 -mt-1">
              <h5 className="!text-[16px] font-medium text-gray-800">
                {step.title}
              </h5>
              <p className="text-sm md:text-base text-gray-600">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
