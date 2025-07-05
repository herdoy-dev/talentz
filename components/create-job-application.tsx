"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import Text from "@/components/ui/text";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { queryClient } from "@/app/query-client-provider";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { storage } from "@/firebase";
import apiClient from "@/services/api-client";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import toast from "react-hot-toast";
import { BsPaperclip, BsX } from "react-icons/bs";
import { FiLoader } from "react-icons/fi";
import { BeatLoader } from "react-spinners";
import Job from "@/schemas/Job";

const FormSchema = z.object({
  message: z.string().min(2, {
    message: "Comment must be at least 2 characters.",
  }),
});

interface Props {
  job: Job;
}

export function CreateJobApplication({ job }: Props) {
  const [isOpen, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<{
    [key: string]: number;
  }>({});
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
        const storageRef = ref(storage, `applications/${job._id}/${filename}`);

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
    if (!job._id) return;
    setLoading(true);

    try {
      let attachments: string[] = [];

      if (files.length > 0) {
        attachments = (await handleUpload(files)) || [];
      }

      await apiClient.post("/applications", {
        message: data.message,
        jobId: job._id,
        attachments: attachments,
      });

      queryClient.invalidateQueries({ queryKey: ["myjobapplication"] });
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      toast.success("Application submitted successfully");
      form.reset();
      setFiles([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setLoading(false);
      setOpen(false);
    } catch (error) {
      toast.error("Unable to submit application");
      console.error(error);
      setLoading(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="px-8 cursor-pointer">
          Apply
        </Button>
      </DialogTrigger>
      <DialogContent className="!w-[800px]">
        <DialogHeader>
          <DialogTitle>Apply For This Job</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6"
            >
              <div className="border p-2 rounded-xl relative pb-5 overflow-hidden">
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <textarea
                          placeholder="Comments"
                          {...field}
                          className="border-none !focus:outline-none outline-none pb-10 w-full"
                          rows={4}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Preview area for selected files */}
                {(files.length > 0 || isUploading) && (
                  <div className="px-3 py-2 bg-gray-50 border rounded-lg flex gap-2 overflow-x-auto mb-2">
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

                <div className="absolute bottom-0 py-2 bg-white w-full">
                  <div className="relative">
                    <label className="flex items-center gap-1 cursor-pointer">
                      <BsPaperclip /> <Text size="small">Attachment</Text>
                    </label>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      multiple
                      className="absolute top-0 left-0 opacity-0 w-full h-full cursor-pointer"
                      disabled={isUploading}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="px-10"
                  disabled={
                    isLoading ||
                    isUploading ||
                    (!form.getValues("message").trim() && files.length === 0)
                  }
                >
                  {isLoading || isUploading ? (
                    <BeatLoader size={8} color="#ffffff" />
                  ) : (
                    "Submit Application"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
