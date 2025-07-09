"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

// Define form schema
const disputeFormSchema = z.object({
  description: z
    .string()
    .min(10, {
      message: "Description must be at least 10 characters long",
    })
    .max(1000, {
      message: "Description must not exceed 1000 characters",
    }),
});

type DisputeFormValues = z.infer<typeof disputeFormSchema>;

export default function Dispute() {
  const form = useForm<DisputeFormValues>({
    resolver: zodResolver(disputeFormSchema),
    defaultValues: {
      description: "",
    },
    mode: "onChange",
  });

  function onSubmit(data: DisputeFormValues) {
    toast("Dispute submitted successfully");
    console.log("Dispute submitted:", data);
  }

  return (
    <div className="container mx-auto px-4 py-8 overflow-y-scroll">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Submit a Dispute</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dispute Details</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Please describe your dispute in detail..."
                        className="min-h-[200px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Be as specific as possible. Include any relevant order
                      numbers, dates, and evidence.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
                <Button type="submit" disabled={!form.formState.isValid}>
                  Submit Dispute
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
