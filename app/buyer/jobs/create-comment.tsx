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

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import Text from "@/components/ui/text";
import { BsPaperclip } from "react-icons/bs";

const FormSchema = z.object({
  comment: z.string().min(2, {
    message: "Comment must be at least 2 characters.",
  }),
});

export function CreateComment() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      comment: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }
  return (
    <Dialog>
      <DialogTrigger asChild className="bg-transparent">
        <div className="flex-1 flex items-center gap-2 cursor-pointer p-3 border rounded-2xl">
          <LuPlus /> <span>Create Comments</span>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Comment</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6"
            >
              <div className="border p-2 rounded-xl relative pb-5">
                <FormField
                  control={form.control}
                  name="comment"
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
                <div className="absolute bottom-0 py-2">
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
                Post
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
