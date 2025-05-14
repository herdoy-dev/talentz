"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Grid } from "@radix-ui/themes";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaRegEdit } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { BeatLoader } from "react-spinners";
import { z } from "zod";

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
import Text from "@/components/ui/text";
import { Textarea } from "@/components/ui/textarea";

import { queryClient } from "@/app/query-client-provider";
import { storage } from "@/firebase";
import useMe from "@/hooks/useMe";
import { Service } from "@/schemas/service";
import apiClient from "@/services/api-client";

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

const serviceFormSchema = z.object({
  title: z
    .string()
    .min(1, "Please enter a service title")
    .max(100, "Title should be less than 100 characters")
    .regex(/^[a-zA-Z0-9\s\-_,.!'()]+$/, "Title contains invalid characters"),
  description: z
    .string()
    .min(30, "Description should be at least 30 characters long")
    .max(1000, "Description should be less than 1000 characters")
    .refine(
      (val) => val.trim().split(/\s+/).length >= 10,
      "Description should contain at least 10 words"
    ),
  image: z.string().min(1, "Please upload an image"),
  tools: z.array(z.string().min(1)).min(1, "Please add at least one tool"),
  features: z
    .array(z.string().min(1))
    .min(1, "Please add at least one feature"),
  details: z.array(z.string().min(1)).min(1, "Please add at least one detail"),
});

type ServiceFormValues = z.infer<typeof serviceFormSchema>;

interface EditServiceProps {
  service?: Service;
}

export default function ServiceForm({ service }: EditServiceProps) {
  const { data: userData } = useMe();
  const [open, setOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: {
      title: service?.title ?? "",
      description: service?.description ?? "",
      image: service?.image ?? "",
      tools: service?.tools ?? [],
      features: service?.features ?? [],
      details: service?.details ?? [],
    },
  });

  const handleRemoveItem = (
    field: "tools" | "features" | "details",
    index: number
  ) => {
    const currentValues = form.getValues()[field];
    form.setValue(
      field,
      currentValues.filter((_, idx) => idx !== index)
    );
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      toast.error("Please upload a JPG, PNG, or WEBP image");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error("File size must be less than 1MB");
      return;
    }

    setIsUploading(true);
    try {
      const storageRef = ref(storage, `services/${Date.now()}_${file.name}`);
      await uploadBytesResumable(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      form.setValue("image", downloadURL);
    } catch (error) {
      toast.error("Failed to upload image");
      console.error("Image upload error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = async (formData: ServiceFormValues) => {
    if (!userData) {
      toast.error("User not authenticated");
      return;
    }

    const serviceData = {
      ...formData,
      userId: userData._id,
    };

    try {
      const endpoint = service ? `/services/${service._id}` : "/services";
      const method = service ? "put" : "post";

      await apiClient[method](endpoint, serviceData);
      toast.success(`Service ${service ? "updated" : "created"} successfully!`);
      queryClient.invalidateQueries({ queryKey: ["services"] });
      setOpen(false);
    } catch (error) {
      toast.error(`Failed to ${service ? "update" : "create"} service`);
      console.error("Service submission error:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {service && (
        <DialogTrigger
          className={buttonVariants({ variant: "ghost", size: "sm" })}
          aria-label="Edit service"
        >
          <FaRegEdit className="text-gray-600 hover:text-gray-900" />
        </DialogTrigger>
      )}

      {!service && (
        <DialogTrigger aria-label="Add new service">
          Add New Service
        </DialogTrigger>
      )}

      <DialogContent className="sm:max-w-[calc(100vw-80px)] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{service ? "Edit" : "Create"} Service</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Grid columns={{ initial: "1", sm: "2" }} className="!gap-6">
              <div className="space-y-4">
                {/* Title */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Web Development"
                          {...field}
                          disabled={form.formState.isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Details */}
                <FormField
                  control={form.control}
                  name="details"
                  render={() => (
                    <FormItem>
                      <FormLabel>Service Details</FormLabel>
                      <FormControl>
                        <div>
                          <Input
                            value={form.watch("details")?.slice(-1)[0] || ""}
                            onChange={(e) => {
                              const currentDetails = form.getValues("details");
                              form.setValue(
                                "details",
                                currentDetails.length > 0
                                  ? [
                                      ...currentDetails.slice(0, -1),
                                      e.target.value,
                                    ]
                                  : [e.target.value]
                              );
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                const value = e.currentTarget.value.trim();
                                if (value) {
                                  form.setValue("details", [
                                    ...form.getValues("details"),
                                    value,
                                  ]);
                                  e.currentTarget.value = "";
                                }
                              }
                            }}
                            placeholder="Add detail (press Enter)"
                            disabled={form.formState.isSubmitting}
                          />
                          <div className="flex flex-wrap gap-2 mt-2">
                            {form.getValues("details").map((detail, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-1 px-3 py-1 bg-muted rounded-full text-sm"
                              >
                                {detail}
                                <RxCross2
                                  className="cursor-pointer hover:text-red-500"
                                  onClick={() =>
                                    handleRemoveItem("details", index)
                                  }
                                  aria-label="Remove detail"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Tools */}
                <FormField
                  control={form.control}
                  name="tools"
                  render={() => (
                    <FormItem>
                      <FormLabel>Tools & Technologies</FormLabel>
                      <FormControl>
                        <div>
                          <Input
                            value={form.watch("tools")?.slice(-1)[0] || ""}
                            onChange={(e) => {
                              const currentTools = form.getValues("tools");
                              form.setValue(
                                "tools",
                                currentTools.length > 0
                                  ? [
                                      ...currentTools.slice(0, -1),
                                      e.target.value,
                                    ]
                                  : [e.target.value]
                              );
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                const value = e.currentTarget.value.trim();
                                if (value) {
                                  form.setValue("tools", [
                                    ...form.getValues("tools"),
                                    value,
                                  ]);
                                  e.currentTarget.value = "";
                                }
                              }
                            }}
                            placeholder="Add tool (press Enter)"
                            disabled={form.formState.isSubmitting}
                          />
                          <div className="flex flex-wrap gap-2 mt-2">
                            {form.getValues("tools").map((tool, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-1 px-3 py-1 bg-muted rounded-full text-sm"
                              >
                                {tool}
                                <RxCross2
                                  className="cursor-pointer hover:text-red-500"
                                  onClick={() =>
                                    handleRemoveItem("tools", index)
                                  }
                                  aria-label="Remove tool"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Features */}
                <FormField
                  control={form.control}
                  name="features"
                  render={() => (
                    <FormItem>
                      <FormLabel>Key Features</FormLabel>
                      <FormControl>
                        <div>
                          <Input
                            value={form.watch("features")?.slice(-1)[0] || ""}
                            onChange={(e) => {
                              const currentFeatures =
                                form.getValues("features");
                              form.setValue(
                                "features",
                                currentFeatures.length > 0
                                  ? [
                                      ...currentFeatures.slice(0, -1),
                                      e.target.value,
                                    ]
                                  : [e.target.value]
                              );
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                const value = e.currentTarget.value.trim();
                                if (value) {
                                  form.setValue("features", [
                                    ...form.getValues("features"),
                                    value,
                                  ]);
                                  e.currentTarget.value = "";
                                }
                              }
                            }}
                            placeholder="Add feature (press Enter)"
                            disabled={form.formState.isSubmitting}
                          />
                          <div className="flex flex-wrap gap-2 mt-2">
                            {form
                              .getValues("features")
                              .map((feature, index) => (
                                <div
                                  key={index}
                                  className="flex items-center gap-1 px-3 py-1 bg-muted rounded-full text-sm"
                                >
                                  {feature}
                                  <RxCross2
                                    className="cursor-pointer hover:text-red-500"
                                    onClick={() =>
                                      handleRemoveItem("features", index)
                                    }
                                    aria-label="Remove feature"
                                  />
                                </div>
                              ))}
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your service in detail"
                          {...field}
                          disabled={form.formState.isSubmitting}
                          rows={5}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Image Upload */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="image"
                  render={() => (
                    <FormItem>
                      <FormLabel>Service Image</FormLabel>
                      <FormControl>
                        <div className="relative h-64 border-2 border-dashed border-primary rounded-2xl flex flex-col items-center justify-center gap-2">
                          <input
                            id="service-image"
                            type="file"
                            accept={ACCEPTED_IMAGE_TYPES.join(",")}
                            onChange={handleImageUpload}
                            disabled={
                              form.formState.isSubmitting || isUploading
                            }
                            className="absolute w-full h-full opacity-0 cursor-pointer"
                          />
                          {form.watch("image") ? (
                            <div className="w-full h-full p-2">
                              <Image
                                src={form.watch("image")}
                                alt="Service preview"
                                fill
                                className="object-cover rounded-lg"
                              />
                            </div>
                          ) : isUploading ? (
                            <div className="flex flex-col items-center gap-2">
                              <BeatLoader size={8} />
                              <Text variant="gray" size="small">
                                Uploading...
                              </Text>
                            </div>
                          ) : (
                            <div className="text-center p-4">
                              <Text>
                                <span className="text-primary">
                                  Click to upload
                                </span>{" "}
                                or drag and drop
                              </Text>
                              <Text variant="gray" size="small">
                                (JPG, PNG, WEBP up to 50MB)
                              </Text>
                            </div>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </Grid>

            <DialogFooter>
              <Button
                type="submit"
                disabled={form.formState.isSubmitting || isUploading}
                className="w-full sm:w-auto"
              >
                {form.formState.isSubmitting ? (
                  <BeatLoader size={6} color="#ffffff" />
                ) : service ? (
                  "Update Service"
                ) : (
                  "Create Service"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
