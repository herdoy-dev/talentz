"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useMyJobs from "@/hooks/useMyJobs";
import apiClient from "@/services/api-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { format } from "date-fns";

const jobSchema = z.object({
  job: z.string().min(1, "Please select a job"),
  amount: z
    .number()
    .min(5, "Minimum amount is $5")
    .max(10000, "Maximum amount is $10,000"),
  deliveryDate: z
    .date({
      required_error: "Delivery date is required",
    })
    .min(new Date(), "Delivery date must be in the future"),
});

type JobFormValues = z.infer<typeof jobSchema>;

interface HireProps {
  sellerId: string;
}

export function Hire({ sellerId }: HireProps) {
  const { data: jobs } = useMyJobs("OPEN");
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      job: "",
      amount: 0,
      deliveryDate: undefined,
    },
  });

  const onSubmit = async (data: JobFormValues) => {
    try {
      const res = await apiClient.post("/orders", {
        ...data,
        seller: sellerId,
        deliveryDate: format(data.deliveryDate, "yyyy-MM-dd"),
      });
      window.location.href = res.data.url;
      toast.success("Hire successful!");
      form.reset();
    } catch (error) {
      console.error("Hire error:", error);
      toast.error("Hire failed. Please try again.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="px-8">
          Hire Now
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Create New Order
          </DialogTitle>
          <DialogDescription>
            Fill in the details to hire this professional
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="job"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Job*</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a job" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Your Open Jobs</SelectLabel>
                        {jobs?.data.map((job) => (
                          <SelectItem key={job._id} value={job._id}>
                            {job.title}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Agreed Amount ($)*</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="50"
                      min="5"
                      max="10000"
                      step="0.01"
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="deliveryDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Delivery Date*</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="date"
                        min={format(new Date(), "yyyy-MM-dd")}
                        onChange={(e) =>
                          field.onChange(new Date(e.target.value))
                        }
                        value={
                          field.value ? format(field.value, "yyyy-MM-dd") : ""
                        }
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="gap-2 sm:gap-0">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" className="w-full sm:w-auto">
                Confirm Order
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
