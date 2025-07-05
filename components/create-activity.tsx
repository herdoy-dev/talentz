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
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { storage } from "@/firebase";
import useMe from "@/hooks/useMe";
import apiClient from "@/services/api-client";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
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
  const [files, setFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>(
    {}
  );
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data: user } = useMe();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...selectedFiles]);
    }
  };

  const handleUpload = async (filesToUpload: File[]) => {
    if (!filesToUpload.length) return [];

    setIsUploading(true);
    try {
      const uploadPromises = filesToUpload.map(async (file) => {
        const filename = `${Date.now()}-${file.name}`;
        const storageRef = ref(storage, `comments/${jobId}/${filename}`);

        setUploadProgress((prev) => ({
          ...prev,
          [file.name]: 0,
        }));

        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);

        return {
          name: file.name,
          url: downloadURL,
        };
      });

      const results = await Promise.all(uploadPromises);
      return results.map((r) => r.url);
    } catch (error) {
      console.error("Error uploading files:", error);
      toast.error("Failed to upload files");
      return [];
    } finally {
      setIsUploading(false);
      setUploadProgress({});
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user || !jobId) return;
    setLoading(true);

    try {
      let attachments: string[] = [];

      if (files.length > 0) {
        attachments = (await handleUpload(files)) || [];
      }

      await apiClient.post("/comments", {
        job: jobId,
        reqType: selectedOption,
        message,
        reqTime: selectedOption === "request_time" ? reqTime : undefined,
        attachments,
      });

      queryClient.invalidateQueries({ queryKey: ["comments"] });
      toast.success("Comment added successfully");
      setFiles([]);
      setMessage("");
      setReqTime("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
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

            {/* File preview section */}
            {(files.length > 0 || isUploading) && (
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">
                  Attachments
                </label>
                <div className="flex flex-wrap gap-2 p-3 bg-muted/50 border rounded-lg">
                  {files.map((file, index) => (
                    <div
                      key={`${file.name}-${index}`}
                      className="relative w-20 h-20 rounded-md border overflow-hidden bg-background"
                    >
                      {file.type.startsWith("image/") ? (
                        <Image
                          src={URL.createObjectURL(file)}
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

                      {uploadProgress[file.name] !== undefined && (
                        <div className="absolute bottom-0 left-0 right-0 p-1">
                          <Progress
                            value={uploadProgress[file.name]}
                            className="h-1"
                          />
                        </div>
                      )}

                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          removeFile(index);
                        }}
                        className="absolute top-1 right-1 p-1 bg-foreground/50 rounded-full hover:bg-foreground/70"
                      >
                        <BsX className="text-background text-xs" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer hover:text-primary transition-colors">
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
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isLoading || isUploading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || isUploading}>
              {isLoading || isUploading ? (
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
