import { buttonVariants } from "@/components/ui/button";
import { Flex, Grid } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import { IoIosCheckmarkCircle } from "react-icons/io";

// Reusable component for feature items
const FeatureItem = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div>
    <div className="flex gap-1 items-center">
      <IoIosCheckmarkCircle className="text-primary-green text-xl" />
      <h4>{title}</h4>
    </div>
    <p>{description}</p>
  </div>
);

export default function Why() {
  const features = [
    {
      title: "Diverse Talent Pool",
      description:
        "Access a wide range of freelancers across various fields, from design to programming.",
    },
    {
      title: "Quality Assurance",
      description:
        "We ensure that all freelancers are vetted for quality and expertise.",
    },
    {
      title: "Flexible Hiring",
      description: "Hire freelancers on a project basis, hourly, or full-time.",
    },
    {
      title: "Secure Payments",
      description:
        "Payments are secure and only released when you're satisfied with the work.",
    },
  ];

  return (
    <Grid
      columns={{ initial: "1", md: "5fr 7fr" }}
      gap="8"
      align="center"
      my="9"
    >
      {/* Image Section */}
      <div className="w-full h-auto">
        <Image
          src="/group.png"
          width={495}
          height={500}
          alt="Group illustration of freelancers"
          className="w-full h-auto"
          priority
        />
      </div>

      {/* Content Section */}
      <Grid columns="1" rows="70px 1fr 70px" className="h-full">
        <h2 className="text-2xl font-bold">Why Choose Us?</h2>
        <div className="flex flex-col gap-8">
          {features.map((feature, index) => (
            <FeatureItem
              key={index}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
        <Flex align="center" gap="3" className="max-w-[300px]">
          <Link
            className={`${buttonVariants()} flex-1 md:flex-1 text-center`}
            href="/"
          >
            Join as a Freelancer
          </Link>
          <Link
            className={`${buttonVariants()} flex-1 md:flex-1 !bg-primary text-center`}
            href="/"
          >
            Hire a Freelancer
          </Link>
        </Flex>
      </Grid>
    </Grid>
  );
}
