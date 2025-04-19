"use client";
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
import Education from "@/schemas/education";
import apiClient from "@/services/api-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaRegEdit } from "react-icons/fa";
import { z } from "zod";

const educationFormSchema = z
  .object({
    degree: z.string().min(1, "Degree is required"),
    institution: z.string().min(1, "Institution is required"),
    startDate: z.date({
      required_error: "Start date is required",
      invalid_type_error: "Please select a valid date",
    }),
    endDate: z.date().optional().nullable(),
  })
  .refine((data) => !data.endDate || data.endDate >= data.startDate, {
    message: "End date must be after start date",
    path: ["endDate"],
  });

type EducationFormValues = z.infer<typeof educationFormSchema>;

interface EditEducationProps {
  education: Education;
}

export function EditEducation({ education }: EditEducationProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const form = useForm<EducationFormValues>({
    resolver: zodResolver(educationFormSchema),
    defaultValues: {
      degree: education.degree,
      institution: education.institution,
      startDate: new Date(education.startDate),
      endDate: education.endDate ? new Date(education.endDate) : null,
    },
    mode: "onChange",
  });

  const handleSubmit = async (data: EducationFormValues) => {
    try {
      await apiClient.put(`/educations/${education._id}`, data);
      toast.success("Education updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["educations"] });
      setIsDialogOpen(false);
    } catch (error) {
      toast.error("Failed to update education");
      console.error("Update education error:", error);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger
        className={buttonVariants({ variant: "ghost", size: "sm" })}
      >
        <FaRegEdit className="text-gray-600 hover:text-gray-900" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Education</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="degree"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Degree*</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Bachelor of Science in Computer Science"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="institution"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Institution*</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. University of Technology"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date*</FormLabel>
                    <FormControl>
                      <DatePicker
                        className="border border-primary py-1 px-2 rounded-md"
                        placeholderText="Start Date..."
                        selected={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <DatePicker
                        className="border border-primary py-1 px-2 rounded-md"
                        placeholderText="Finished Date..."
                        selected={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button
                type="submit"
                disabled={
                  !form.formState.isValid || form.formState.isSubmitting
                }
              >
                Update Education
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
