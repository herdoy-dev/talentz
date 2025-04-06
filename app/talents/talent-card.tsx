"use client";
import { Button } from "@/components/button";
import Avatar from "@/components/ui/avatar";
import IconBadge from "@/components/ui/icon-badge";
import Text from "@/components/ui/text";
import Image from "next/image";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { GrLocation } from "react-icons/gr";

export default function TalentCard() {
  const [isLiked, setLiked] = useState(false);
  return (
    <div className="rounded-2xl overflow-hidden border border-gray-200 shadow">
      <Image
        src="/card-1.png"
        width={560}
        height={220}
        alt="talent"
        className="w-full h-auto object-cover"
      />
      <div className="py-4 px-3 space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-1 md:gap-3">
            <Avatar
              className="w-8 h-8 md:w-10 md:h-10"
              src="/me.jpg"
              alt="me"
            />
            <div>
              <h5 className="text-sm md:text-xl">Herdoy Almamun</h5>
              <div className="flex items-center gap-1 md:gap-5">
                <Text variant="gray" size="small">
                  Web Developer
                </Text>
                <IconBadge text="LA, US">
                  <GrLocation />
                </IconBadge>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-5">
            <div
              onClick={() => setLiked((prev) => !prev)}
              className="w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center border border-gray-200 cursor-pointer"
            >
              {isLiked ? (
                <FaHeart className="text-primary text-sm md:text-[16px]" />
              ) : (
                <FaRegHeart className="text-primary text-sm md:text-[16px]" />
              )}
            </div>
            <Button
              variant="outline"
              className="py-[2px] px-2 md:py-[4px] md:px-4 border"
            >
              Message
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
          <div className="flex items-center gap-1 md:gap-3">
            <Text>93</Text>
            <Text size="small" variant="gray">
              Job Success
            </Text>
          </div>
          <div className="flex items-center gap-1 md:gap-3">
            <Text>4.4</Text>
            <div className="flex items-center text-sm text-yellow-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>
          </div>
          <div className="flex items-center gap-1 md:gap-3">
            <Text>18</Text>
            <Text size="small" variant="gray">
              Total Job
            </Text>
          </div>
          <div className="flex items-center gap-1 md:gap-3">
            <Text>12</Text>
            <Text size="small" variant="gray">
              Skills
            </Text>
          </div>
        </div>
        <hr className="text-gray-300" />
        <Text size="small">
          Let&apos;s go your story out there! I&apos;m a copy writer with a
          special interest in B2B business, Contact me for a quick breakdown of
          cost by subtask, ullamcorper egestas egestas...
        </Text>
      </div>
    </div>
  );
}
