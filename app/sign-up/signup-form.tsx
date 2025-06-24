"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import apiClient from "@/services/api-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface Props {
  role: "freelancer" | "client";
}

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ApiResponse from "@/schemas/ApiRespose";
import Link from "next/link";
import { useState } from "react";
import { BeatLoader } from "react-spinners";

const FormSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(64, "Password must not exceed 64 characters"),
    retypePassword: z.string().min(1, "Please retype your password"),
  })
  .refine((data) => data.password === data.retypePassword, {
    message: "Passwords don't match",
    path: ["retypePassword"],
  });

export default function SignupForm({ role }: Props) {
  const [isLoading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      retypePassword: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    try {
      const res = await apiClient.post<ApiResponse<string>>("/auth/sign-up", {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        role: role,
      });
      toast.success(res.data.message);
      Cookies.set("token", res.data.data, {
        expires: 7,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
      });
      form.reset();
      window.location.reload();
      setLoading(false);
    } catch (error) {
      if (
        error instanceof AxiosError &&
        error.response &&
        error.response.data
      ) {
        toast.error(error.response.data);
        return;
      }
      toast.error("Oops! Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Firs tName:</FormLabel>
              <FormControl>
                <Input placeholder="First Name" {...field} />
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
              <FormLabel>Last tName:</FormLabel>
              <FormControl>
                <Input placeholder="First Name" {...field} />
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
              <FormLabel>Email:</FormLabel>
              <FormControl>
                <Input placeholder="Email" type="Email" {...field} />
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
              <FormLabel>Password:</FormLabel>
              <FormControl>
                <Input placeholder="Password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="retypePassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password:</FormLabel>
              <FormControl>
                <Input
                  placeholder="Retype Password"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">
          {isLoading ? <BeatLoader /> : "Sign Up"}
        </Button>
        <div className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/log-in" className="text-primary underline">
            Log in here
          </Link>
        </div>
      </form>
    </Form>
  );
}
