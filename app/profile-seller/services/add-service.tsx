"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Grid } from "@radix-ui/themes";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
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
import apiClient from "@/services/api-client";

const portfolioFormSchema = z
  .object({
    title: z
      .string()
      .min(1, "Please enter a project title")
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
  })
  .refine(
    (data) =>
      data.title.trim().toLowerCase() !== data.description.trim().toLowerCase(),
    {
      message: "Description should be different from the title",
      path: ["description"],
    }
  );

type PortfolioFormValues = z.infer<typeof portfolioFormSchema>;

export default function AddService() {
  const { data: userData } = useMe();

  const [open, setOpen] = useState(false);
  const [toolInput, setToolInput] = useState("");
  const [tools, setTools] = useState<string[]>([]);
  const [featureInput, setFeatureInput] = useState("");
  const [features, setFeatures] = useState<string[]>([]);
  const [detailInput, setDetailInput] = useState("");
  const [details, setDetails] = useState<string[]>([]);
  const [image, setImage] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<PortfolioFormValues>({
    resolver: zodResolver(portfolioFormSchema),
    defaultValues: {
      title: "",
      description: "",
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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const storageRef = ref(storage, `portfolio/${Date.now()}`);
      await uploadBytesResumable(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      setImage(downloadURL);
    } catch (error) {
      toast.error("Failed to upload image");
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = async (formData: PortfolioFormValues) => {
    if (!userData) return;

    const updatedService = {
      ...formData,
      userId: userData._id,
      details,
      tools,
      features,
      image,
    };

    try {
      await apiClient.post("/services", updatedService);
      toast.success("Service updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["services"] });
      setOpen(false);
    } catch (error) {
      toast.error("Failed to update service");
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={buttonVariants()}>
        Add New Project
      </DialogTrigger>

      <DialogContent className="sm:max-w-[calc(100vw-80px)]">
        <DialogHeader>
          <DialogTitle>Edit Service</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Grid columns="2" style={{ gap: 30 }}>
              <div className="space-y-4">
                {/* Title */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. E-commerce Website"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Details */}
                <div>
                  <FormLabel>Add Details</FormLabel>
                  <Input
                    value={detailInput}
                    onChange={(e) => setDetailInput(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" &&
                      (e.preventDefault(),
                      handleAddItem(
                        detailInput,
                        setDetails,
                        details,
                        () => setDetailInput(""),
                        "detail"
                      ))
                    }
                    placeholder="Add detail (press Enter)"
                  />
                  <div className="flex flex-wrap gap-2 mt-2">
                    {details.map((d, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-1 px-3 py-1 bg-muted rounded-full text-sm"
                      >
                        {d}
                        <RxCross2
                          className="cursor-pointer hover:text-red-500"
                          onClick={() =>
                            setDetails(details.filter((_, idx) => idx !== i))
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tools */}
                <div>
                  <FormLabel>Add Tools</FormLabel>
                  <Input
                    value={toolInput}
                    onChange={(e) => setToolInput(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" &&
                      (e.preventDefault(),
                      handleAddItem(
                        toolInput,
                        setTools,
                        tools,
                        () => setToolInput(""),
                        "tool"
                      ))
                    }
                    placeholder="Add tool (press Enter)"
                  />
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tools.map((t, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-1 px-3 py-1 bg-muted rounded-full text-sm"
                      >
                        {t}
                        <RxCross2
                          className="cursor-pointer hover:text-red-500"
                          onClick={() =>
                            setTools(tools.filter((_, idx) => idx !== i))
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div>
                  <FormLabel>Add Features</FormLabel>
                  <Input
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" &&
                      (e.preventDefault(),
                      handleAddItem(
                        featureInput,
                        setFeatures,
                        features,
                        () => setFeatureInput(""),
                        "feature"
                      ))
                    }
                    placeholder="Add feature (press Enter)"
                  />
                  <div className="flex flex-wrap gap-2 mt-2">
                    {features.map((f, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-1 px-3 py-1 bg-muted rounded-full text-sm"
                      >
                        {f}
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

                {/* Description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your project"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Image Upload */}
              <div className="flex flex-col h-full">
                <FormLabel htmlFor="portfolio-image">Media</FormLabel>
                <div className="relative h-[450px] border-2 border-dashed border-primary rounded-2xl flex items-center justify-center">
                  <input
                    id="portfolio-image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUploading}
                    className="absolute w-full h-full opacity-0 cursor-pointer"
                  />
                  {image ? (
                    <div className="w-full h-full p-2">
                      <Image
                        src={image}
                        alt="Preview"
                        width={500}
                        height={300}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  ) : isUploading ? (
                    <BeatLoader size={8} />
                  ) : (
                    <div className="text-center">
                      <Text>
                        <span className="text-primary">Upload</span> image or
                        drag and drop
                      </Text>
                      <Text
                        variant="gray"
                        size="small"
                        className="text-gray-400"
                      >
                        (JPG, PNG formats, up to 50MB)
                      </Text>
                    </div>
                  )}
                </div>
              </div>
            </Grid>

            <DialogFooter className="mt-6">
              <Button
                type="submit"
                disabled={form.formState.isSubmitting || isUploading}
              >
                {form.formState.isSubmitting ? (
                  <BeatLoader size={6} />
                ) : (
                  "Update Service"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
