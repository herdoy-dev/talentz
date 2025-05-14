"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import { BeatLoader } from "react-spinners";
import { z } from "zod";

import { queryClient } from "@/app/query-client-provider";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
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
import usePackages from "@/hooks/usePackages";
import apiClient from "@/services/api-client";
import { Grid } from "@radix-ui/themes";
import { GoDotFill } from "react-icons/go";

const portfolioFormSchema = z.object({
  label: z
    .string()
    .min(1, "Please enter a project title")
    .max(255, "Title should be less than 255 characters"),
  price: z.string().min(5).max(5000),
});

type PortfolioFormValues = z.infer<typeof portfolioFormSchema>;

interface Props {
  serviceId: string;
}

export default function AddPricing({ serviceId }: Props) {
  const [feature, setFeature] = useState("");
  const [features, setFeatures] = useState<string[]>([]);
  const form = useForm<PortfolioFormValues>({
    resolver: zodResolver(portfolioFormSchema),
    defaultValues: {
      label: "",
      price: "",
    },
  });

  const handleAddItem = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    currentList: string[],
    inputReset: () => void,
    fieldName: string
  ) => {
    const trimmed = value.trim();
    if (!trimmed) {
      toast.error(`Please enter a ${fieldName}`);
      return;
    }
    setter([...currentList, trimmed]);
    inputReset();
  };

  const onSubmit = async (formData: PortfolioFormValues) => {
    try {
      await apiClient.post("/packages", {
        ...formData,
        features,
        serviceId,
      });
      toast.success("Service updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["packages"] });
      form.reset();
      setFeatures([]);
    } catch (error) {
      toast.error("Failed to update service");
      console.error(error);
    }
  };

  const { data } = usePackages(serviceId);

  return (
    <Dialog>
      <DialogTrigger className={buttonVariants()}>Add Pricing</DialogTrigger>

      <DialogContent className="sm:max-w-[calc(100vw-80px)]">
        <DialogHeader>
          <DialogTitle>Add Package</DialogTitle>
        </DialogHeader>
        <Grid columns={{ initial: "1", md: "2" }} className="w-full !gap-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-4">
                {/* Title */}
                <FormField
                  control={form.control}
                  name="label"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Label</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. (Gold, Platinum, Sliver)"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Price */}
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input placeholder="Price" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Details */}
                <div>
                  <FormLabel className="mb-2">Add features</FormLabel>
                  <Input
                    value={feature}
                    onChange={(e) => setFeature(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" &&
                      (e.preventDefault(),
                      handleAddItem(
                        feature,
                        setFeatures,
                        features,
                        () => setFeature(""),
                        "detail"
                      ))
                    }
                    placeholder="Add feature (press Enter)"
                  />
                  <div className="flex flex-wrap gap-2 mt-2">
                    {features.map((d, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-1 px-3 py-1 bg-muted rounded-full text-sm"
                      >
                        {d}
                        <RxCross2
                          className="cursor-pointer hover:text-red-500"
                          onClick={() =>
                            setFeatures(features.filter((_, idx) => idx !== i))
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </form>
          </Form>
          {data && data.result && (
            <div className="space-y-5">
              {data.result.map((d) => (
                <div key={d._id} className="border p-3 shadow rounded-2xl">
                  <div className="flex w-full items-center justify-between">
                    <h3> {d.label} </h3>
                    <h3> ${d.price} </h3>
                  </div>
                  <ul className="space-y-1">
                    {d.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-1">
                        <GoDotFill /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </Grid>
        <DialogFooter className="mt-6">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? <BeatLoader size={6} /> : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
