import ListIcon from "@/components/ui/list-icon";
import { Flex, Grid } from "@radix-ui/themes";
import Image from "next/image";

export default function Steps() {
  return (
    <div className="my-12">
      <h1 className="text-center mb-8 text-2xl font-bold">
        Simple Steps to Get Started
      </h1>
      <Grid columns={{ initial: "1", md: "2" }} gap="6">
        {/* Freelancer Section */}
        <Flex
          gap="6"
          align="start"
          direction={{ initial: "column", md: "row" }}
          className="border p-3"
        >
          <Image
            src="/steps/free.png"
            width={264}
            height={282}
            alt="freelancer"
            className="my-4"
          />
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-primary">
              For Freelancers
            </h3>
            <Grid columns="18px 1fr" gap="2">
              <div className="flex items-start pt-[4px] justify-center">
                <ListIcon listNo={1} />
              </div>
              <div className="px-1">
                <h4>Create Your Profile</h4>
                <p>
                  Showcase your skills and experience with a standout profile.
                </p>
              </div>
            </Grid>
            <Grid columns="18px 1fr" gap="2">
              <div className="flex items-start pt-[4px] justify-center">
                <ListIcon listNo={2} />
              </div>
              <div className="px-1">
                <h4>Browse Jobs</h4>
                <p>Explore exciting projects that match your expertise.</p>
              </div>
            </Grid>
            <Grid columns="18px 1fr" gap="2">
              <div className="flex items-start pt-[4px] justify-center">
                <ListIcon isLast={true} listNo={3} />
              </div>
              <div className="px-1">
                <h4>Submit Proposals</h4>
                <p>Pitch your skills and win projects that inspire you!</p>
              </div>
            </Grid>
          </div>
        </Flex>

        {/* Employer Section */}
        <Flex
          gap="6"
          align="start"
          direction={{ initial: "column", md: "row" }}
          className="border p-3"
        >
          <Image
            src="/steps/emp.png"
            width={264}
            height={282}
            alt="employer"
            className="my-4"
          />
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-primary">
              For Employers
            </h3>
            <Grid columns="18px 1fr" gap="2">
              <div className="flex items-start pt-[4px] justify-center">
                <ListIcon listNo={1} />
              </div>
              <div className="px-1">
                <h4>Post Your Project</h4>
                <p>Share your project details and requirements.</p>
              </div>
            </Grid>
            <Grid columns="18px 1fr" gap="2">
              <div className="flex items-start pt-[4px] justify-center">
                <ListIcon listNo={2} />
              </div>
              <div className="px-1">
                <h4>Review Proposals</h4>
                <p>Browse through talented freelancers and their proposals.</p>
              </div>
            </Grid>
            <Grid columns="18px 1fr" gap="2">
              <div className="flex items-start pt-[4px] justify-center">
                <ListIcon isLast={true} listNo={3} />
              </div>
              <div className="px-1">
                <h4>Choose Your Match</h4>
                <p>
                  Select the best fit for your project and start collaborating!
                </p>
              </div>
            </Grid>
          </div>
        </Flex>
      </Grid>
    </div>
  );
}
