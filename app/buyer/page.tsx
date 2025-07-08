"use client";
import { Calendar } from "@/components/calender";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Flex, Grid, Box } from "@radix-ui/themes";
import Link from "next/link";
import { useState } from "react";
import RoyaltyProgress from "../../components/royalty-progress";
import Switch from "../switch";
import JobChart from "./job-chart";
import NewApplications from "./new-applications";
import RequestActions from "./request-actions";
import SpendChart from "./spend-chart";

const options = ["Monthly", "Yearly"] as const;

const chartData = [
  { browser: "Design & Creative", jobCount: 12, fill: "#28C3AB" },
  { browser: "Development & IT", jobCount: 8, fill: "#39F3BB" },
  { browser: "AI Services", jobCount: 5, fill: "#1A9395" },
  { browser: "Sales & Marketing", jobCount: 7, fill: "#E2F397" },
];

export default function BuyerPage() {
  const [current, setCurrent] = useState<(typeof options)[number]>("Monthly");

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Header Section */}
      <Flex
        align="center"
        justify="between"
        mb="5"
        className="flex-col gap-4 sm:flex-row"
      >
        <h2 className="text-2xl font-semibold text-gray-800">
          Dashboard Overview
        </h2>
        <Link
          className={cn(buttonVariants(), "w-full sm:w-auto text-center")}
          href="/buyer/jobs/new"
        >
          Create New Job
        </Link>
      </Flex>

      {/* Top Cards Section */}
      <Grid columns={{ initial: "1", sm: "2", md: "3" }} gap="4" mb="6">
        <Box className="order-2 md:order-1">
          <NewApplications />
        </Box>
        <Box className="order-3 md:order-2">
          <RequestActions />
        </Box>
        <Box className="order-1 md:order-3">
          <Calendar />
        </Box>
      </Grid>

      {/* Main Content Section */}
      <Grid columns={{ initial: "1", lg: "3fr 4fr" }} gap="6">
        {/* Left Column */}
        <div className="space-y-4">
          {/* Active Jobs Card */}
          <div className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
            <Flex align="center" justify="between" mb="4">
              <h3 className="text-lg font-medium text-gray-700">Active Jobs</h3>
              <Switch
                options={options}
                selected={current}
                onChange={setCurrent}
              />
            </Flex>

            <div className="flex flex-col lg:flex-row gap-4">
              <div className="w-full lg:w-1/2 h-64">
                <JobChart />
              </div>
              <div className="w-full lg:w-1/2">
                <Grid columns="2" gap="3">
                  {chartData.map((item, i) => (
                    <Grid
                      columns={"12px 1fr"}
                      gap="2"
                      key={i}
                      className="items-center"
                    >
                      <div
                        className={cn("rounded-full w-3 h-3")}
                        style={{
                          background: item.fill,
                        }}
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          {item.browser}
                        </p>
                        <p className="text-gray-800">
                          <span className="text-xl font-bold">
                            {item.jobCount}
                          </span>{" "}
                          Jobs
                        </p>
                      </div>
                    </Grid>
                  ))}
                </Grid>
              </div>
            </div>
          </div>

          {/* Royalty Progress */}
          <RoyaltyProgress />
        </div>

        {/* Right Column - Spend Chart */}

        <SpendChart />
      </Grid>
    </div>
  );
}
