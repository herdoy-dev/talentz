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
import TextArea from "@/components/ui/text-area";
import useMe from "@/hooks/useMe";
import apiClient from "@/services/api-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Flex, Grid } from "@radix-ui/themes";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { BeatLoader } from "react-spinners";
import { z } from "zod";

// Enhanced validation schema
const FormSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name must be less than 50 characters"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name must be less than 50 characters"),
  email: z
    .string()
    .min(5, "Email must be at least 5 characters")
    .email("Invalid email address"),
  phone: z
    .string()
    .regex(/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/, "Invalid phone number")
    .min(1)
    .max(20, "Phone number too long")
    .optional()
    .or(z.literal("")), // Allow empty string
  title: z
    .string()
    .min(1)
    .max(100, "Title must be less than 100 characters")
    .optional(),
  location: z
    .string()
    .min(1)
    .max(100, "Location must be less than 100 characters")
    .optional(),
  about: z
    .string()
    .min(10, "About must be at least 10 characters")
    .max(1000, "About must be less than 1000 characters"),
});

export default function ProfileForm() {
  const { data: user, isLoading, error } = useMe();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      title: "",
      location: "",
      about: "",
    },
  });

  // Reset form when user data loads
  useEffect(() => {
    if (user) {
      form.reset({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        title: user.title || "",
        location: user.location || "",
        about: user.about || "",
      });
    }
  }, [user, form]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      await apiClient.put(`/users/${user?._id}`, data);
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries({ queryKey: ["me"] });
    } catch (error) {
      toast.error("Error updating profile");
      console.log(error);
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4 rounded border border-red-200 bg-red-50">
        Error loading profile data: {error.message}
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <Grid columns={{ initial: "1fr", md: "2" }} gap="4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="First Name"
                    {...field}
                    disabled={form.formState.isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Last Name"
                    {...field}
                    disabled={form.formState.isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Grid>

        <Grid columns={{ initial: "1fr", md: "2" }} gap="4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Email"
                    type="email"
                    {...field}
                    disabled={form.formState.isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Phone"
                    type="tel"
                    {...field}
                    disabled={form.formState.isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Grid>

        <Grid columns={{ initial: "1fr", md: "2" }} gap="4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your professional title"
                    {...field}
                    disabled={form.formState.isSubmitting}
                  />
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
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your location"
                    {...field}
                    disabled={form.formState.isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Grid>

        <FormField
          control={form.control}
          name="about"
          render={({ field }) => (
            <FormItem>
              <FormLabel>About</FormLabel>
              <FormControl>
                <TextArea
                  placeholder="Tell us about yourself..."
                  rows={5}
                  {...field}
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Flex justify="end" gap="3">
          <Button
            type="submit"
            disabled={form.formState.isSubmitting || !form.formState.isDirty}
            className="flex items-center justify-center w-40 h-[40px]"
          >
            {form.formState.isSubmitting ? <BeatLoader /> : "Save Changes"}
          </Button>
        </Flex>
      </form>
    </Form>
  );
}
