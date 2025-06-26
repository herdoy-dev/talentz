"use client";
import { queryClient } from "@/app/query-client-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { storage } from "@/firebase";
import useMe from "@/hooks/useMe";
import apiClient from "@/services/api-client";
import { useChatStore } from "@/store";
import { Flex } from "@radix-ui/themes";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import { BsPaperclip, BsX } from "react-icons/bs";
import { FiLoader } from "react-icons/fi";
import { LuSendHorizontal } from "react-icons/lu";

export default function MessageForm() {
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<{
    [key: string]: number;
  }>({});
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const currentChat = useChatStore((s) => s.currentChat);
  const { data: user } = useMe();

  if (!currentChat || !user) return <div />;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...selectedFiles]);
      handleUpload(selectedFiles);
    }
  };

  const handleUpload = async (filesToUpload: File[]) => {
    if (!filesToUpload.length) return;

    setIsUploading(true);
    try {
      const uploadPromises = filesToUpload.map(async (file) => {
        const filename = `${Date.now()}-${file.name}`;
        const storageRef = ref(storage, `chat/${currentChat._id}/${filename}`);

        // Create upload task with progress tracking
        const uploadTask = uploadBytes(storageRef, file);

        // Reset progress for this file
        setUploadProgress((prev) => ({
          ...prev,
          [file.name]: 0,
        }));

        // Get download URL after upload completes
        const snapshot = await uploadTask;
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
      return [];
    } finally {
      setIsUploading(false);
      setUploadProgress({});
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!message.trim() && files.length === 0) return;

    try {
      let attachments: string[] = [];

      if (files.length > 0) {
        attachments = (await handleUpload(files)) || [];
      }

      await apiClient.post("/messages", {
        chatId: currentChat._id,
        message,
        sender: user.data._id,
        files: attachments,
      });

      setMessage("");
      setFiles([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      queryClient.invalidateQueries({
        queryKey: ["chats"],
      });
      queryClient.invalidateQueries({
        queryKey: ["messages"],
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="border-t flex items-center">
      {/* Preview area for selected files */}
      {(files.length > 0 || isUploading) && (
        <div className="px-3 py-2 bg-gray-50 border-b flex gap-2 overflow-x-auto">
          {files.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="relative flex-shrink-0 w-16 h-16 rounded-md border overflow-hidden bg-gray-100"
            >
              {file.type.startsWith("image/") ? (
                <Image
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  width={64}
                  height={64}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full">
                  <span className="text-xs text-center p-1 break-all">
                    {file.name}
                  </span>
                </div>
              )}

              {/* Upload progress indicator */}
              {uploadProgress[file.name] !== undefined &&
                uploadProgress[file.name] < 100 && (
                  <div className="absolute bottom-0 left-0 right-0 p-1">
                    <Progress
                      value={uploadProgress[file.name]}
                      className="h-1"
                    />
                  </div>
                )}

              {/* Remove button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(index);
                }}
                className="absolute top-0 right-0 p-1 bg-black/50 rounded-full hover:bg-black/70"
              >
                <BsX className="text-white text-xs" />
              </button>
            </div>
          ))}

          {/* Loading indicator for new uploads */}
          {isUploading && files.length === 0 && (
            <div className="flex items-center justify-center w-full py-2">
              <FiLoader className="animate-spin text-gray-500 mr-2" />
              <span className="text-sm text-gray-500">Uploading files...</span>
            </div>
          )}
        </div>
      )}

      {/* Input area */}
      <Flex align="center" className="px-3 py-2 flex-1">
        <Flex align="center" className="relative">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            multiple
            className="absolute top-0 left-0 w-full h-full border-none focus:outline-none opacity-0"
            disabled={isUploading}
          />
          <Button
            variant="ghost"
            size="sm"
            className="cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
          >
            <BsPaperclip />
          </Button>
        </Flex>

        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message"
          className="flex-1 rounded-none mx-2"
          disabled={isUploading}
        />

        <Button
          onClick={handleSubmit}
          className="rounded-none cursor-pointer"
          disabled={isUploading || (!message.trim() && files.length === 0)}
        >
          {isUploading ? (
            <FiLoader className="animate-spin" />
          ) : (
            <LuSendHorizontal />
          )}
        </Button>
      </Flex>
    </div>
  );
}
