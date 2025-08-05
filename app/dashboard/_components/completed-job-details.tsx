"use client";
import { queryClient } from "@/app/query-client-provider";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import useComments from "@/hooks/useComments";
import useMe from "@/hooks/useMe";
import { Chat } from "@/schemas/Chat";
import Job from "@/schemas/Job";
import apiClient from "@/services/api-client";
import { useChatStore } from "@/store";
import { Flex } from "@radix-ui/themes";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaAngleLeft } from "react-icons/fa6";
import { LuMessagesSquare } from "react-icons/lu";
import Comment from "../seller/jobs/comment";

interface Props {
  job: Job;
  title: string;
}

export function CompletedJobDetails({ job, title }: Props) {
  const [isOpen, setOpen] = useState(false);
  const { data: comments } = useComments(job._id);
  const setCurrentChat = useChatStore((s) => s.setCurrentChat);
  const { data: user } = useMe();
  const router = useRouter();

  const handleMessageClick = async () => {
    try {
      if (!user?.data) return;

      const chatPartnerId =
        user.data.role === "client" ? job.seller : job.author._id;

      const { data: chat } = await apiClient.post<Chat>("/chats", {
        [user.data.role === "client" ? "seller" : "buyer"]: chatPartnerId,
      });

      setCurrentChat(chat);
      queryClient.invalidateQueries({ queryKey: ["chats"] });
      router.push(
        `/${
          user.data.role === "client" ? "dashboard/buyer" : "dashboard/seller"
        }/messages`
      );
    } catch (error) {
      toast.error("Failed to start conversation");
      console.log(error);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-start p-2 hover:bg-gray-50 transition-colors"
          aria-label={`View details for ${title}`}
        >
          <h3 className="font-medium text-gray-800 group-hover:text-primary transition-colors text-left">
            {title}
          </h3>
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-2xl lg:max-w-3xl p-0 flex flex-col">
        <SheetTitle />
        <SheetHeader className="sticky top-0 bg-background z-10 border-b px-6 py-4 shadow-sm">
          <Flex justify="between" align="center">
            <Button
              onClick={() => setOpen(false)}
              variant="ghost"
              size="sm"
              className="gap-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full"
              aria-label="Close job details"
            >
              <FaAngleLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back to jobs</span>
            </Button>

            <Button
              size="sm"
              variant="outline"
              className="gap-2"
              onClick={handleMessageClick}
              aria-label="Message about this job"
            >
              <LuMessagesSquare className="h-4 w-4" />
              <span>Message</span>
            </Button>
          </Flex>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto">
          <section className="px-6 py-4 border-b">
            <div className="flex items-center gap-3 mb-3">
              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  {title}
                </h2>
                <p className="text-sm text-muted-foreground">
                  Posted by {job.author.firstName} {job.author.lastName}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
              <div>
                <p className="text-muted-foreground">Budget</p>
                <p className="font-medium">${job.budgetAmount.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Completed</p>
                <p className="font-medium">
                  {formatDistanceToNow(new Date(job.createdAt), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </div>
          </section>

          {/* Comments Section */}
          <section className="px-6 py-4">
            <h3 className="text-lg font-semibold mb-4">Activity</h3>

            <ul className="space-y-6">
              {comments?.data.map((comment) => (
                <li key={comment._id}>
                  <Comment comment={comment} />
                </li>
              ))}
            </ul>
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
}
