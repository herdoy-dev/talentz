import { Button } from "@/components/ui/button";
import { Avatar, Flex } from "@radix-ui/themes";
import Image from "next/image";
import { FaRegHeart } from "react-icons/fa6";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";

export default function TalentCard() {
  return (
    <div className="rounded-xl overflow-hidden border border-gray-300">
      <Image width={560} height={218} src="/talent.png" alt="Talent" />
      <div className="px-2 py-4">
        <Flex align="start" justify="between">
          <Flex align="center" gap="2">
            <Avatar radius="full" src="/me.png" fallback="user" />
            <div>
              <h3 className="!text-[18px]">Herdoy Almamun</h3>
              <Flex align="center" gap="2">
                <span className="text-sm text-gray-500 text-[12px]">
                  Copy Writer
                </span>
                <Flex
                  align="center"
                  gap="2"
                  className="text-gray-500 !text-[12px]"
                >
                  <SlLocationPin />
                  <span className="text-black text-[15px]">USA</span>
                </Flex>
              </Flex>
            </div>
          </Flex>
          <Flex align="center" gap="3">
            <Flex
              align="center"
              justify="center"
              className="w-8 h-8 border rounded-full"
            >
              <FaRegHeart />
            </Flex>
            <Button
              size="sm"
              variant="outline"
              className="rounded-4xl border-primary"
            >
              Message
            </Button>
          </Flex>
        </Flex>
        <Flex align="center" gap="5" py="3">
          <p className="text-gray-500 text-[12px]">
            <span className="!text-black !text-[19px]">98%</span> Job Success!{" "}
          </p>
          <Flex align="center">
            <span className="!text-black !text-[19px] pr-2">5</span>
            <Flex align="center" className="text-yellow-300">
              <MdOutlineStarPurple500 />
              <MdOutlineStarPurple500 />
              <MdOutlineStarPurple500 />
              <MdOutlineStarPurple500 />
              <MdOutlineStarPurple500 />
            </Flex>
          </Flex>
          <p className="text-gray-500 text-[12px]">
            <span className="!text-black !text-[19px]">9</span> Total Job{" "}
          </p>
          <p className="text-gray-500 text-[12px]">
            <span className="!text-black !text-[19px]">14</span> Skills{" "}
          </p>
        </Flex>
        <hr />
        <p className="py-4">
          Let&apos;s go your story out there! I&apos;m a copy writer with a
          special interest in B2B business, Contact me for a quick breakdown of
          cost by subtask, ullamcorper egestas egestas...
        </p>
      </div>
    </div>
  );
}
