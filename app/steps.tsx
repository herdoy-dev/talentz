import ListIcon from "@/components/ui/list-icon";
import { Flex, Grid } from "@radix-ui/themes";
import Image from "next/image";

// Define the type for Step props
interface StepProps {
  listNo: number;
  title: string;
  description: string;
  isLast?: boolean;
}

// Reusable Step Component
const Step = ({ listNo, title, description, isLast = false }: StepProps) => (
  <Grid columns="18px 1fr" gap="2">
    <div className="flex items-start pt-[4px] justify-center">
      <ListIcon listNo={listNo} isLast={isLast} />
    </div>
    <div className="px-1">
      <h4 className="font-medium">{title}</h4>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  </Grid>
);

export default function Steps() {
  // Define the type for steps
  interface StepData {
    listNo: number;
    title: string;
    description: string;
    isLast?: boolean;
  }

  const freelancerSteps: StepData[] = [
    {
      listNo: 1,
      title: "Create Your Profile",
      description:
        "Showcase your skills and experience with a standout profile.",
    },
    {
      listNo: 2,
      title: "Browse Jobs",
      description: "Explore exciting projects that match your expertise.",
    },
    {
      listNo: 3,
      title: "Submit Proposals",
      description: "Pitch your skills and win projects that inspire you!",
      isLast: true,
    },
  ];

  const employerSteps: StepData[] = [
    {
      listNo: 1,
      title: "Post Your Project",
      description: "Share your project details and requirements.",
    },
    {
      listNo: 2,
      title: "Review Proposals",
      description: "Browse through talented freelancers and their proposals.",
    },
    {
      listNo: 3,
      title: "Choose Your Match",
      description:
        "Select the best fit for your project and start collaborating!",
      isLast: true,
    },
  ];

  return (
    <div className="my-12 px-4">
      <h1 className="text-center mb-8 text-2xl font-bold">
        Simple Steps to Get Started
      </h1>
      <Grid columns={{ initial: "1", md: "2" }} gap="6">
        {/* Freelancer Section */}
        <Flex
          gap="6"
          align="start"
          direction={{ initial: "column", md: "row" }}
          className="border p-6 rounded-lg shadow-sm"
        >
          <Image
            src="/steps/free.png"
            width={264}
            height={282}
            alt="freelancer"
            className="my-4"
            priority
          />
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-primary">
              For Freelancers
            </h3>
            {freelancerSteps.map((step, index) => (
              <Step key={index} {...step} />
            ))}
          </div>
        </Flex>

        {/* Employer Section */}
        <Flex
          gap="6"
          align="start"
          direction={{ initial: "column", md: "row" }}
          className="border p-6 rounded-lg shadow-sm"
        >
          <Image
            src="/steps/emp.png"
            width={264}
            height={282}
            alt="employer"
            className="my-4"
            priority
          />
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-primary">
              For Employers
            </h3>
            {employerSteps.map((step, index) => (
              <Step key={index} {...step} />
            ))}
          </div>
        </Flex>
      </Grid>
    </div>
  );
}
