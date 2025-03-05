import { buttonVariants } from "@/components/ui/button";
import { Flex, Grid, Separator } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <div>
      <Flex align="center" justify="center" className="py-10 px-4">
        <div className="max-w-[663px] flex flex-col gap-6 items-center justify-between w-full">
          <h1 className="text-center text-2xl md:text-3xl font-bold">
            Connect with Top Talent or Find Your Dream Freelance Job!
          </h1>

          <div className="w-full">
            <div className="h-12 rounded-4xl border border-primary flex items-center justify-between px-4 py-2">
              <input
                placeholder="Search for..."
                className="flex-1 bg-transparent focus:outline-none border-none text-sm md:text-base"
              />
              <div className="flex items-center">
                <Separator
                  orientation="vertical"
                  className="h-full w-[2px] mr-2 bg-primary"
                />
                <select className="border-none focus:outline-none bg-transparent text-sm md:text-base">
                  <option value="1">Job</option>
                  <option value="1">Talent</option>
                </select>
              </div>
            </div>
          </div>

          <p className="text-center max-w-[400px] text-sm md:text-base">
            Bridging the gap between skilled freelancers and forward-thinking
            employers. Let&apos;s grow together!
          </p>

          <Flex
            align="center"
            gap="3"
            direction={{ initial: "column", md: "row" }}
            className="w-full md:flex-row md:px-10"
          >
            <Link className={`${buttonVariants()} w-full md:flex-1`} href="/">
              Join as a Freelancer
            </Link>
            <Link
              className={`${buttonVariants()} w-full md:flex-1 !bg-primary`}
              href="/"
            >
              Hire a Freelancer
            </Link>
          </Flex>
        </div>
      </Flex>
      <Grid columns={{ initial: "1", md: "2" }} className="md:py-14 py-8">
        <Image
          src="/hero/as1.png"
          width={714}
          height={396}
          alt="hero illustration"
          className="max-w-full h-full hidden md:block"
        />

        <Image
          src="/hero/as2.png"
          width={714}
          height={396}
          alt="hero illustration"
          className="max-w-full h-full"
        />
      </Grid>
    </div>
  );
}
