import { Flex, Grid } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";

// Constants for image dimensions and paths
const IMAGE_DIMENSIONS = {
  freelancer: { width: 215, height: 237 },
  client: { width: 180, height: 200 },
} as const;

type ImageAltType = keyof typeof IMAGE_DIMENSIONS; // "freelancer" | "client"

const ROLES = [
  {
    role: "Job Seeker",
    path: "/signup/freelancer",
    imageSrc: "/freelancer.png",
    imageAlt: "freelancer" as ImageAltType, // Explicitly type imageAlt
  },
  {
    role: "Employer",
    path: "/signup/client",
    imageSrc: "/client.png",
    imageAlt: "client" as ImageAltType, // Explicitly type imageAlt
  },
];

// Reusable RoleCard component
const RoleCard = ({
  role,
  path,
  imageSrc,
  imageAlt,
}: (typeof ROLES)[number]) => (
  <Link href={path} passHref>
    <Flex
      align="center"
      justify="center"
      direction="column"
      className="w-[200px] h-[150px] md:w-[300px] md:h-[268px] rounded-3xl border relative cursor-pointer hover:shadow-lg transition-shadow"
      role="button"
      aria-label={`Select ${role} role`}
    >
      <Image
        src={imageSrc}
        width={IMAGE_DIMENSIONS[imageAlt].width}
        height={IMAGE_DIMENSIONS[imageAlt].height}
        alt={imageAlt}
        className="absolute bottom-10 md:bottom-16 w-[120px] h-[160px] md:w-[190px] md:h-[237px]"
      />
      <h3 className="absolute bottom-2 md:bottom-5 text-lg font-semibold">
        {role}
      </h3>
    </Flex>
  </Link>
);

export default function Signup() {
  return (
    <Flex
      align="center"
      justify="center"
      direction="column"
      className="h-[90dvh]"
      gap="9"
    >
      <span className="text-primary text-2xl mb-5 font-bold">
        Please Select Your Role
      </span>
      <Grid columns={{ initial: "1", md: "2" }} gap={{ initial: "9", md: "7" }}>
        {ROLES.map((role) => (
          <RoleCard key={role.role} {...role} />
        ))}
      </Grid>
    </Flex>
  );
}
