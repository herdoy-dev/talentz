"use client";
import { Calendar } from "@/components/calender";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Flex, Grid } from "@radix-ui/themes";
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
  { browser: "Design & Creative", jobCount: 4, fill: "#28C3AB" },
  { browser: "Development & IT", jobCount: 2, fill: "#39F3BB" },
  { browser: "AI Services", jobCount: 3, fill: "#1A9395" },
  { browser: "Salse & Marketing", jobCount: 3, fill: "#E2F397" },
];

export default function BuyerPage() {
  const [current, setCurrent] = useState<(typeof options)[number]>("Monthly");
  return (
    <div>
      <Flex align="center" justify="between" mb="5">
        <h2>Dashboard</h2>
        <Link className={buttonVariants()} href="/buyer/jobs/new">
          Create New Job
        </Link>
      </Flex>
      <Grid columns={"1fr 1fr 1fr"} gap="6" mb="9">
        <NewApplications />
        <RequestActions />
        <Calendar />
      </Grid>
      <Grid columns={"3fr 4fr"} gap="6">
        <div className="space-y-6">
          <div className="bg-white border rounded-3xl p-6">
            <Flex align="center" justify="between">
              <h3>Active Jobs</h3>
              <Switch
                options={options}
                selected={current}
                onChange={setCurrent}
              />
            </Flex>
            <Grid columns="300px 1fr">
              <JobChart />
              <Flex align="center">
                <Grid columns="2" gap="5">
                  {chartData.map((item, i) => (
                    <Grid columns={"10px 1fr"} gap="1" key={i}>
                      <div
                        className={cn("rounded-3xl")}
                        style={{
                          background: item.fill,
                        }}
                      />
                      <div>
                        <p>Design & Creative</p>
                        <p>
                          <span className="!text-2xl font-bold">12</span> Job
                        </p>
                      </div>
                    </Grid>
                  ))}
                </Grid>
              </Flex>
            </Grid>
          </div>
          <RoyaltyProgress />
        </div>
        <SpendChart />
      </Grid>
    </div>
  );
}
