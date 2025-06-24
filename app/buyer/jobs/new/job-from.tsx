"use client";

import { queryClient } from "@/app/query-client-provider";
import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import useCategorys from "@/hooks/useCategory";
import useMe from "@/hooks/useMe";
import apiClient from "@/services/api-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { BeatLoader } from "react-spinners";
import { z } from "zod";

// Zod schema matching Mongoose model exactly
const jobSchema = z.object({
  title: z.string().min(1, "Job title is required").max(255),
  location: z.string().min(1, "Location is required").max(255),
  category: z.string().min(1, "Category is required"),
  jobType: z.enum(["fixed", "hourly", "full-time"]),
  company: z.string().min(1, "Company name is required").max(255),
  requiredExperienceLevel: z.enum(["entry", "intermediate", "expert"]),
  duration: z.enum(["large", "medium", "small"]),
  budgetType: z.enum(["fixed", "custom"]),
  budgetAmount: z.coerce
    .number()
    .min(5, "Minimum budget is $5")
    .max(10000, "Maximum budget is $10,000"),
  description: z
    .string()
    .min(300, "Description must be at least 300 characters")
    .max(10000, "Description cannot exceed 10,000 characters"),
});

type JobFormValues = z.infer<typeof jobSchema>;

export default function JobForm() {
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const { data: categorys } = useCategorys();
  const { data: user } = useMe();

  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: "",
      category: "",
      jobType: undefined,
      company: "",
      requiredExperienceLevel: undefined,
      duration: "medium",
      budgetType: undefined,
      location: "",
      budgetAmount: 0,
      description: "",
    },
  });

  const addSkill = () => {
    const trimmedSkill = skillInput.trim();
    if (trimmedSkill && !skills.includes(trimmedSkill)) {
      setSkills([...skills, trimmedSkill]);
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleSubmit = async (data: JobFormValues) => {
    if (!user) return null;
    try {
      const payload = {
        ...data,
        requiredSkills: skills,
        author: user.data._id,
      };
      await apiClient.post("/jobs", payload);
      toast.success("Job posted successfully");
      queryClient.invalidateQueries({ queryKey: ["my_jobs"] });
      form.reset();
      setSkills([]);
    } catch (error) {
      console.error(error);
      toast.error("Failed to post job");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6 w-full"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Title*</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Senior UX Designer" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category*</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full border-primary">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Categories</SelectLabel>
                      {categorys?.data.map((category) => (
                        <SelectItem key={category._id} value={category._id}>
                          {category.name}
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
            name="jobType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Type*</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full border-primary">
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Types</SelectLabel>
                      <SelectItem value="fixed">Fixed</SelectItem>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="hourly">Hourly</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name*</FormLabel>
                <FormControl>
                  <Input placeholder="Company name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location*</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Remote, New York" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div>
          <FormLabel className="mb-2">Skills</FormLabel>
          <div className="border border-primary rounded-md flex items-center overflow-hidden">
            <input
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && (e.preventDefault(), addSkill())
              }
              placeholder="Type a skill and press Add"
              className="flex-1 px-3 py-2 outline-none"
            />
            <button
              type="button"
              onClick={addSkill}
              className="w-20 py-2 bg-primary text-white"
            >
              Add
            </button>
          </div>

          {skills.length > 0 && (
            <div className="py-4">
              <p className="font-medium">Added Skills</p>
              <div className="flex flex-wrap gap-2 py-3">
                {skills.map((skill, index) => (
                  <Button
                    key={index}
                    type="button"
                    onClick={() => removeSkill(skill)}
                    size="sm"
                    variant="secondary"
                  >
                    {skill} <IoClose />
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>

        <FormField
          control={form.control}
          name="requiredExperienceLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Required Experience Levels*</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="w-full border-primary">
                    <SelectValue placeholder="Select Required Experience Level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Required Experience Level</SelectLabel>
                    <SelectItem value="entry">Entry</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="expert">Expert</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration*</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full border-primary">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Duration</SelectLabel>
                      <SelectItem value="large">More than 6 months</SelectItem>
                      <SelectItem value="medium">3-6 months</SelectItem>
                      <SelectItem value="small">1-3 months</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="budgetType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Budget Type*</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full border-primary">
                      <SelectValue placeholder="Select budget type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Budget Types</SelectLabel>
                      <SelectItem value="fixed">Fixed Package</SelectItem>
                      <SelectItem value="custom">Custom Offer</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="budgetAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Budget Amount*</FormLabel>
              <FormControl>
                <Input placeholder="Enter budget amount" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Description*</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe the job..."
                  rows={8}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={form.formState.isSubmitting || !form.formState.isDirty}
            className="min-w-32"
          >
            {form.formState.isSubmitting ? (
              <BeatLoader size={8} color="#ffffff" />
            ) : (
              "Post Job"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
