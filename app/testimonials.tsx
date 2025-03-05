"use client";

import { cn } from "@/lib/utils";
import { Avatar, Flex } from "@radix-ui/themes";
import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

// Mock data for testimonials
const testimonials = [
  {
    id: 1,
    name: "Herdoy",
    role: "Web Developer",
    image: "/me.png",
    text: "Lorem ipsum dolor sit amet consectetur. Mattis vulputate aenean ornare sed ultricies arcu varius sed dictum. Augue duis mi quam senectus. Rhoncus vitae elit elementum amet aliquam. Fames leo justo condimentum ut tincidunt bibendum.",
  },
  {
    id: 2,
    name: "Herdoy",
    role: "Web Developer",
    image: "/me.png",
    text: "Lorem ipsum dolor sit amet consectetur. Mattis vulputate aenean ornare sed ultricies arcu varius sed dictum. Augue duis mi quam senectus. Rhoncus vitae elit elementum amet aliquam. Fames leo justo condimentum ut tincidunt bibendum.",
  },
  {
    id: 3,
    name: "Herdoy",
    role: "Web Developer",
    image: "/me.png",
    text: "Lorem ipsum dolor sit amet consectetur. Mattis vulputate aenean ornare sed ultricies arcu varius sed dictum. Augue duis mi quam senectus. Rhoncus vitae elit elementum amet aliquam. Fames leo justo condimentum ut tincidunt bibendum.",
  },
  {
    id: 4,
    name: "Herdoy",
    role: "Web Developer",
    image: "/me.png",
    text: "Lorem ipsum dolor sit amet consectetur. Mattis vulputate aenean ornare sed ultricies arcu varius sed dictum. Augue duis mi quam senectus. Rhoncus vitae elit elementum amet aliquam. Fames leo justo condimentum ut tincidunt bibendum.",
  },
  // Add more testimonials here
];

export default function Testimonials() {
  const [currentItems, setCurrentItems] = useState<"freelancers" | "employers">(
    "freelancers"
  );

  return (
    <section className="my-16 px-4">
      <h1 className="text-center mb-6 text-2xl font-bold">
        What Our Users Say
      </h1>
      <div className="flex justify-center">
        <div className="w-[300px] h-[25px] flex items-center justify-between border rounded-full">
          <button
            onClick={() => setCurrentItems("employers")}
            className={cn(
              "cursor-pointer flex-1 text-xs h-full flex items-center justify-center rounded-full transition-colors",
              currentItems === "employers"
                ? "bg-primary text-white"
                : "bg-transparent"
            )}
            aria-label="Switch to employers"
          >
            Employer
          </button>
          <button
            onClick={() => setCurrentItems("freelancers")}
            className={cn(
              "cursor-pointer flex-1 text-xs h-full flex items-center justify-center rounded-full transition-colors",
              currentItems === "freelancers"
                ? "bg-primary text-white"
                : "bg-transparent"
            )}
            aria-label="Switch to freelancers"
          >
            Freelancer
          </button>
        </div>
      </div>
      <div className="mt-14">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem
                key={testimonial.id}
                className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <div className="p-1">
                  <Card>
                    <CardContent className="p-4">
                      <Flex align="center" gap="3">
                        <Avatar
                          size="2"
                          radius="full"
                          src={testimonial.image}
                          fallback="user"
                          alt={`${testimonial.name}'s avatar`}
                        />
                        <div>
                          <h4 className="font-semibold">{testimonial.name}</h4>
                          <span className="text-gray-600 text-xs">
                            {testimonial.role}
                          </span>
                        </div>
                      </Flex>
                      <p className="text-justify mt-3 text-sm">
                        {testimonial.text}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
}
