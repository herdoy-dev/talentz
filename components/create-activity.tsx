"use client";
import { queryClient } from "@/app/query-client-provider";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useFilesUpload } from "@/hooks/useFilesUpload";
import useMe from "@/hooks/useMe";
import apiClient from "@/services/api-client";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { BsPaperclip, BsX } from "react-icons/bs";
import { LuPlus } from "react-icons/lu";
import { BeatLoader } from "react-spinners";

interface CommentType {
  value: string;
  label: string;
}

interface Props {
  jobId: string;
  commentTypes: CommentType[];
}

export function CreateComment({ jobId, commentTypes }: Props) {
  const [isOpen, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [reqTime, setReqTime] = useState("");
  const [selectedOption, setSelectedOption] = useState("comment");
  const { data: user } = useMe();

  // Using the filesUpload hook
  const {
    fileInputRef,
    isUploading,
    attachments,
    handleFileChange,
    triggerFileInput,
    removeAttachment,
    resetAttachments,
  } = useFilesUpload(`comments/${jobId}`);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user || !jobId) return;
    setLoading(true);

    try {
      await apiClient.post("/comments", {
        job: jobId,
        reqType: selectedOption,
        message,
        reqTime: selectedOption === "request_time" ? reqTime : undefined,
        attachments: attachments.map((a) => a.url),
      });

      queryClient.invalidateQueries({ queryKey: ["comments"] });
      toast.success("Comment added successfully");
      resetAttachments();
      setMessage("");
      setReqTime("");
      setLoading(false);
      setOpen(false);
    } catch (error) {
      toast.error("Unable to send comment");
      console.error(error);
      setLoading(false);
    }
  }

  const getDialogTitle = () => {
    switch (selectedOption) {
      case "delivery":
        return "Submit Work";
      case "request_time":
        return "Request Time Extension";
      case "request_fund":
        return "Request Additional Funds";
      default:
        return "Add Comment";
    }
  };

  const getPlaceholderText = () => {
    switch (selectedOption) {
      case "delivery":
        return "Describe your work submission...";
      case "request_time":
        return "Explain why you need more time...";
      case "request_fund":
        return "Explain why you need additional funds...";
      default:
        return "Write your comment...";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild className="bg-transparent">
        <div className="flex-1 flex items-center gap-2 cursor-pointer p-3 border rounded-2xl">
          <LuPlus /> <span>Create Comment</span>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {getDialogTitle()}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium leading-none">
                Comment Type
              </label>
              <Select value={selectedOption} onValueChange={setSelectedOption}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select comment type" />
                </SelectTrigger>
                <SelectContent>
                  {commentTypes.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium leading-none">
                Message
              </label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={getPlaceholderText()}
                rows={4}
                className="rounded-lg"
              />
            </div>

            {selectedOption === "request_time" && (
              <div className="grid gap-2">
                <label className="text-sm font-medium leading-none">
                  New Delivery Date
                </label>
                <Input
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  value={reqTime}
                  onChange={(e) => setReqTime(e.target.value)}
                  className="rounded-lg"
                />
              </div>
            )}

            {/* File preview section using hook's attachments */}
            {attachments.length > 0 && (
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">
                  Attachments
                </label>
                <div className="flex flex-wrap gap-2 p-3 bg-muted/50 border rounded-lg">
                  {attachments.map((file, index) => (
                    <div
                      key={`${file.url}-${index}`}
                      className="relative w-20 h-20 rounded-md border overflow-hidden bg-background"
                    >
                      {file.type.startsWith("image/") ? (
                        <Image
                          src={file.url}
                          alt={file.name}
                          width={80}
                          height={80}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center w-full h-full p-1">
                          <BsPaperclip className="text-muted-foreground" />
                          <span className="text-xs text-center truncate w-full px-1">
                            {file.name}
                          </span>
                        </div>
                      )}

                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          removeAttachment(index);
                        }}
                        className="absolute top-1 right-1 p-1 bg-foreground/50 rounded-full hover:bg-foreground/70"
                        disabled={isUploading}
                      >
                        <BsX className="text-background text-xs" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                onClick={triggerFileInput}
                disabled={isUploading}
              >
                <BsPaperclip className="h-4 w-4" />
                <span>Add Attachment</span>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  multiple
                  className="hidden"
                  disabled={isUploading}
                />
              </Button>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setOpen(false);
                resetAttachments();
              }}
              disabled={isLoading || isUploading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={
                isLoading ||
                isUploading ||
                (!message.trim() && attachments.length === 0)
              }
            >
              {isLoading ? (
                <BeatLoader size={8} color="#ffffff" />
              ) : selectedOption === "comment" ? (
                "Post Comment"
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
