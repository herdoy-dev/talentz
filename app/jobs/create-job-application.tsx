"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { queryClient } from "@/app/query-client-provider";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import Text from "@/components/ui/text";
import Job from "@/schemas/Job";
import apiClient from "@/services/api-client";
import { useState } from "react";
import toast from "react-hot-toast";
import { BsPaperclip } from "react-icons/bs";
import { BeatLoader } from "react-spinners";

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

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      message: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!job._id) return;
    setLoading(true);
    try {
      await apiClient.post("/applications", {
        ...data,
        buyer: job.author._id,
        jobId: job._id,
      });
      queryClient.invalidateQueries({ queryKey: ["myjobapplication"] });
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      toast.success("Applyed");
      form.reset();
      setLoading(false);
      setOpen(false);
    } catch (error) {
      toast.error("Unable to sent Comment");
      console.log(error);
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
                          className="border-none !focus:outline-none outline-none pb-10"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="absolute bottom-0 py-2 bg-white w-full">
                  <div className="relative">
                    <div className="flex items-center gap-1 cursor-pointer">
                      <BsPaperclip /> <Text size="small">Attachment</Text>
                    </div>
                    <input
                      type="file"
                      className="absolute top-0 left-0 opacity-0 border-none focus:outline-none outline-none w-full h-full"
                    />
                  </div>
                </div>
              </div>
              <Button type="submit" className="px-10">
                {isLoading ? <BeatLoader /> : "Post"}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
