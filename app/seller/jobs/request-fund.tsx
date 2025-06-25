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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useMe from "@/hooks/useMe";
import apiClient from "@/services/api-client";
import { useState } from "react";
import toast from "react-hot-toast";
import { BsPaperclip } from "react-icons/bs";
import { BeatLoader } from "react-spinners";

const FormSchema = z.object({
  message: z.string().min(2, {
    message: "Comment must be at least 2 characters.",
  }),
  reqFund: z
    .number()
    .min(5, {
      message: "Minimum amount is $5",
    })
    .max(10000, {
      message: "Maximum amount is $10,000",
    }),
});

interface Props {
  jobId: string;
}

export function RequestFund({ jobId }: Props) {
  const [isOpen, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const { data: user } = useMe();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      message: "",
      reqFund: 0,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!user || !jobId) return;
    setLoading(true);
    try {
      await apiClient.post("/comments", {
        ...data,
        job: jobId,
        reqType: "request_fund",
      });
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      toast.success("Fund request submitted successfully!");
      form.reset();
      setLoading(false);
      setOpen(false);
    } catch (error) {
      toast.error("Failed to submit fund request");
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild className="bg-transparent">
        <div className="flex-1 flex items-center gap-2 cursor-pointer p-3 border rounded-2xl">
          <LuPlus /> <span>Request Fund</span>
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
                name="reqFund"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount ($)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter amount"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        className="rounded-lg"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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

              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer hover:text-primary transition-colors">
                  <BsPaperclip className="h-4 w-4" />
                  <span>Add Attachment</span>
                  <input type="file" className="hidden" />
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
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
