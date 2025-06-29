"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LuPlus } from "react-icons/lu";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { queryClient } from "@/app/query-client-provider";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { storage } from "@/firebase";
import useMe from "@/hooks/useMe";
import apiClient from "@/services/api-client";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import toast from "react-hot-toast";
import { BsPaperclip, BsX } from "react-icons/bs";
import { FiLoader } from "react-icons/fi";
import { BeatLoader } from "react-spinners";

const FormSchema = z.object({
  message: z.string().min(2, {
    message: "Comment must be at least 2 characters.",
  }),
});

interface Props {
  jobId: string;
}

export function CreateComment({ jobId }: Props) {
  const [isOpen, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<{
    [key: string]: number;
  }>({});
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data: user } = useMe();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      message: "",
    },
  });

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

        // Reset progress for this file
        setUploadProgress((prev) => ({
          ...prev,
          [file.name]: 0,
        }));

        // Get download URL after upload completes
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
      return [];
    } finally {
      setIsUploading(false);
      setUploadProgress({});
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!user || !jobId) return;
    setLoading(true);

    try {
      let attachments: string[] = [];

      if (files.length > 0) {
        attachments = (await handleUpload(files)) || [];
      }

      await apiClient.post("/comments", {
        ...data,
        job: jobId,
        reqType: "comment",
        attachments,
      });

      queryClient.invalidateQueries({ queryKey: ["comments"] });
      toast.success("Comment added successfully");
      form.reset();
      setFiles([]);
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

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild className="bg-transparent">
        <div className="flex-1 flex items-center gap-2 cursor-pointer p-3 border rounded-2xl">
          <LuPlus /> <span>Create Comment</span>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Request Additional Funds
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reason for Request</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Explain why you need additional funds..."
                        {...field}
                        rows={4}
                        className="rounded-lg"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Preview area for selected files */}
              {(files.length > 0 || isUploading) && (
                <div className="px-3 py-2 bg-gray-50 border rounded-lg flex gap-2 overflow-x-auto">
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
                      <span className="text-sm text-gray-500">
                        Uploading files...
                      </span>
                    </div>
                  )}
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

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isLoading || isUploading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={
                  isLoading ||
                  isUploading ||
                  (!form.getValues("message").trim() && files.length === 0)
                }
              >
                {isLoading || isUploading ? (
                  <BeatLoader size={8} color="#ffffff" />
                ) : (
                  "Submit Request"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
