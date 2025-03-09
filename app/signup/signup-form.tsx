"use client";

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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// Define the form schema using Zod
const FormSchema = z
  .object({
    firstName: z
      .string()
      .min(2, { message: "First name must be at least 2 characters long." })
      .max(50, {
        message: "First name must be no more than 50 characters long.",
      })
      .refine((val) => val.trim().length > 0, {
        message: "First name is required.",
      }),

    lastName: z
      .string()
      .min(2, { message: "Last name must be at least 2 characters long." })
      .max(50, {
        message: "Last name must be no more than 50 characters long.",
      })
      .refine((val) => val.trim().length > 0, {
        message: "Last name is required.",
      }),

    email: z
      .string()
      .email({ message: "Please enter a valid email address." })
      .min(5, { message: "Email must be at least 5 characters long." })
      .max(100, { message: "Email must be no more than 100 characters long." })
      .refine((val) => val.trim().length > 0, {
        message: "Email is required.",
      }),

    password: z
      .string()
      .min(10, { message: "Password must be at least 10 characters long." })
      .max(100, {
        message: "Password must be no more than 100 characters long.",
      })
      .refine((val) => val.trim().length > 0, {
        message: "Password is required.",
      }),

    confirmPassword: z
      .string()
      .min(10, { message: "Password must be at least 10 characters long." })
      .max(100, {
        message: "Password must be no more than 100 characters long.",
      })
      .refine((val) => val.trim().length > 0, {
        message: "Password is required.",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Define the type for the form values
type FormValues = z.infer<typeof FormSchema>;

export function SignupForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      // Simulate an API call or any async operation
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Your account has been created successfully!", {
        description: "Welcome to our platform!",
      });
      console.log(data);
      // Reset the form after successful submission
      form.reset();
    } catch (error) {
      toast.error("Failed to create account", {
        description: "Please try again later.",
      });
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-normal">First Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your first name" {...field} />
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
              <FormLabel className="font-normal">Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your last name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-normal">Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-normal">Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-normal">Confirm Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Confirm your password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting
            ? "Creating Account..."
            : "Create Account"}
        </Button>
      </form>
    </Form>
  );
}
