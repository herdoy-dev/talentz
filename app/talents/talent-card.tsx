import { Button } from "@/components/ui/button";
import { Avatar, Flex } from "@radix-ui/themes";
import Image from "next/image";
import { FaRegHeart } from "react-icons/fa6";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";

export default function TalentCard() {
  return (
    <div className="rounded-xl overflow-hidden border border-gray-300 hover:shadow-lg transition-shadow duration-300">
      <div className="relative w-full h-48 sm:h-56 md:h-64">
        <Image
          src="/talent.png"
          alt="Talent"
          layout="fill"
          objectFit="cover"
          className="hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="px-4 py-6">
        <Flex
          align="start"
          justify="between"
          direction={{ initial: "column", sm: "row" }}
          gap="4"
        >
          <Flex align="center" gap="4">
            <Avatar radius="full" src="/me.png" fallback="user" size="4" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Herdoy Almamun
              </h3>
              <Flex align="center" gap="2" className="mt-1">
                <span className="text-sm text-gray-500">Copy Writer</span>
                <Flex align="center" gap="2" className="text-gray-500">
                  <SlLocationPin />
                  <span className="text-black">USA</span>
                </Flex>
              </Flex>
            </div>
          </Flex>
          <Flex align="center" gap="3" className="mt-4 sm:mt-0">
            <button className="p-2 border rounded-full hover:bg-gray-100 transition-colors duration-200">
              <FaRegHeart className="text-gray-600" />
            </button>
            <Button
              size="sm"
              variant="outline"
              className="rounded-full border-primary hover:bg-primary hover:text-white transition-colors duration-200"
            >
              Message
            </Button>
          </Flex>
        </Flex>
        <Flex align="center" gap="4" className="mt-6">
          <p className="text-gray-500 text-sm">
            <span className="text-black font-semibold">98%</span> Job Success
          </p>
          <Flex align="center" gap="1">
            <span className="text-black font-semibold">5</span>
            <Flex align="center" className="text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <MdOutlineStarPurple500 key={i} />
              ))}
            </Flex>
          </Flex>
          <p className="text-gray-500 text-sm">
            <span className="text-black font-semibold">9</span> Total Jobs
          </p>
          <p className="text-gray-500 text-sm">
            <span className="text-black font-semibold">14</span> Skills
          </p>
        </Flex>
        <hr className="my-4" />
        <p className="text-gray-600 text-sm leading-relaxed">
          Let&apos;s get your story out there! I&apos;m a copywriter with a
          special interest in B2B business. Contact me for a quick breakdown of
          cost by subtask, ullamcorper egestas egestas...
        </p>
      </div>
    </div>
  );
}
