"use client";
import { Badge } from "@/components/ui/badge";
import { Flex } from "@radix-ui/themes";
import { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { MdOutlineCategory } from "react-icons/md";
import { PiBuildingApartmentLight } from "react-icons/pi";
import { SlLocationPin } from "react-icons/sl";

export default function Job() {
  const [liked, setLiked] = useState(false);

  return (
    <div className="border-b border-gray-200 space-y-4 pb-6 relative hover:bg-gray-50 transition-colors duration-200 p-4 rounded-lg">
      {/* Like Button */}
      <div
        onClick={() => setLiked(!liked)}
        className="absolute top-4 right-4 cursor-pointer text-gray-500 hover:text-red-500 transition-colors duration-200"
        aria-label={liked ? "Unlike job" : "Like job"}
      >
        {liked ? (
          <FaHeart className="text-red-500" />
        ) : (
          <FaRegHeart className="hover:text-red-500" />
        )}
      </div>

      {/* Posted Time and Status Badge */}
      <Flex align="center" gap="2" className="text-gray-500 text-sm">
        <span>Posted 51 minutes ago</span>
        <Badge variant="secondary" className="text-xs">
          Applied
        </Badge>
      </Flex>

      {/* Job Title */}
      <h3 className="text-xl font-semibold text-gray-800 hover:text-primary transition-colors duration-200">
        Designer Interview - For UX Designer, Product Designer, User Researcher,
        UI Designer
      </h3>

      {/* Job Details */}
      <Flex
        className="text-gray-500"
        align="center"
        gap={{ initial: "3", md: "6" }}
        wrap="wrap"
      >
        <Flex align="center" gap="2">
          <SlLocationPin className="text-gray-400" />
          <span>USA</span>
        </Flex>
        <Flex align="center" gap="2">
          <PiBuildingApartmentLight className="text-gray-400" />
          <span>Abc Tech</span>
        </Flex>
        <Flex align="center" gap="2">
          <MdOutlineCategory className="text-gray-400" />
          <span>Web Design</span>
        </Flex>
      </Flex>
    </div>
  );
}
