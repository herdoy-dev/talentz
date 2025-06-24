"use client";
import Container from "@/components/ui/container";
import { useState } from "react";
import Switch from "./switch";
import TestimonialCard from "./testimonial-card";

const options = ["Employer", "Freelancer"] as const;

export default function Testimonials() {
  const [current, setCurrent] =
    useState<(typeof options)[number]>("Freelancer");

  return (
    <section id="what-out-users-say">
      <Container className="py-10 my-10 flex items-center justify-center flex-col">
        <h1 className="mb-6">What Our Users Say</h1>
        <Switch options={options} selected={current} onChange={setCurrent} />

        <div className="w-full gap-8 md:gap-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mt-12">
          <TestimonialCard />
          <TestimonialCard />
          <TestimonialCard />
          <TestimonialCard />
        </div>
      </Container>
    </section>
  );
}
