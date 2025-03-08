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
    <div className="border-b border-dark space-y-3 pb-5 relative">
      <Flex align="center" gap="2" className="text-gray-400">
        <span>Posted 51 minutes ago</span>{" "}
        <Badge variant="secondary">Applied</Badge>
      </Flex>
      <h3>
        Designer interview- For UX designer, product designer, user researcher,
        UI designer
      </h3>
      <Flex className="text-gray-400" align="center" gap="6">
        <Flex align="center" gap="2">
          <SlLocationPin />
          <span>USA</span>
        </Flex>
        <Flex align="center" gap="2">
          <PiBuildingApartmentLight />
          <span>Abc Tech</span>
        </Flex>
        <Flex align="center" gap="2">
          <MdOutlineCategory />
          <span>Web Design</span>
        </Flex>
      </Flex>
      <div
        onClick={() => setLiked(!liked)}
        className="absolute top-2 right-2 cursor-pointer"
      >
        {liked ? <FaHeart /> : <FaRegHeart />}
      </div>
    </div>
  );
}
