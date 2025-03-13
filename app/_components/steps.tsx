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
      <div className="flex gap-2 h-[170px] md:h-[205px]">
        <div className="flex flex-col items-center">
          <div className="w-5 h-5 bg-secondary flex items-center justify-center rounded-full text-white text-xs font-semibold">
            1
          </div>
          <div className="flex-1 w-px bg-gray-300 my-2" />
          <div className="w-5 h-5 bg-secondary flex items-center justify-center rounded-full text-white text-xs font-semibold">
            2
          </div>
          <div className="flex-1 w-px bg-gray-300 my-2" />
          <div className="w-5 h-5 bg-secondary flex items-center justify-center rounded-full text-white text-xs font-semibold">
            3
          </div>
        </div>

        {/* Step Details */}
        <div className="flex-1 flex flex-col justify-between min-h-[230px] md:min-h-[280px] -mt-1">
          {steps.map((step) => (
            <div key={step.id} className="flex-1">
              <h5 className="!text-[16px] font-medium text-gray-800">
                {step.title}
              </h5>
              <p className="text-sm md:text-base text-gray-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
