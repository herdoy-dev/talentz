"use client";
import { queryClient } from "@/app/query-client-provider";
import { Button } from "@/components/ui/button";
import IconBadge from "@/components/ui/icon-badge";
import Text from "@/components/ui/text";
import useMe from "@/hooks/useMe";
import { Chat } from "@/schemas/Chat";
import { Talent } from "@/schemas/Talent";
import apiClient from "@/services/api-client";
import { useChatStore } from "@/store";
import { Avatar } from "@radix-ui/themes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { GrLocation } from "react-icons/gr";

interface Props {
  talent: Talent;
}

export default function TalentCard({ talent }: Props) {
  const [isLiked, setLiked] = useState(false);
  const setCurrentChat = useChatStore((s) => s.setCurrentChat);
  const router = useRouter();
  const { data: user } = useMe();

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
              src={talent.image ? talent.image : "/card-1.png"}
              fallback="me"
              radius="full"
            />
            <div>
              <h5 className="text-sm md:text-xl">
                {talent.firstName + " " + talent.lastName}
              </h5>
              <div className="flex items-center gap-1 md:gap-5">
                <Text variant="gray" size="small">
                  {talent.title}
                </Text>
                <IconBadge text={talent.location}>
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
            {user?.data._id === talent._id ? null : (
              <Button
                variant="outline"
                className="py-[2px] px-2 md:py-[4px] md:px-4 border cursor-pointer"
                onClick={async () => {
                  if (!user) return router.push("/log-in");
                  try {
                    const { data } = await apiClient.post<Chat>("/chats", {
                      buyer: user.data._id,
                      seller: talent._id,
                    });
                    setCurrentChat(data);
                    queryClient.invalidateQueries({
                      queryKey: ["chats"],
                    });
                    router.push(
                      `/${
                        user.data.role === "freelancer"
                          ? "seller"
                          : user.data.role
                      }/messages`
                    );
                  } catch (error) {
                    console.log(error);
                  }
                }}
              >
                Message
              </Button>
            )}
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
            <Text> {talent.skills.length} </Text>
            <Text size="small" variant="gray">
              Skills
            </Text>
          </div>
        </div>
        <hr className="text-gray-300" />
        <Text size="small">
          {talent && talent.about && talent.about.slice(0, 200)} ...
        </Text>
      </div>
    </div>
  );
}
