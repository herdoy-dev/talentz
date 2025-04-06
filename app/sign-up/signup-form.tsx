"use client";
import { setAuthToken } from "@/actions/set-token";
import { Button } from "@/components/button";
import Input from "@/components/ui/input";
import apiClient from "@/services/api-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

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

type FormSchemaType = z.infer<typeof FormSchema>;

interface Props {
  role: "freelancer" | "client";
}

export default function SignUpForm({ role }: Props) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (data: FormSchemaType) => {
    try {
      const { headers } = await apiClient.post<string>("/auth/sign-up", {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        role: role,
      });
      await setAuthToken(headers["x-auth-token"]);
      reset();
      toast.success("Account created successfully");
      router.push("/");
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
    }
  };

  return (
    <form className="space-y-4 w-full" onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="First Name"
        type="text"
        {...register("firstName")}
        error={errors.firstName?.message}
      />
      <Input
        label="Last Name"
        type="text"
        {...register("lastName")}
        error={errors.lastName?.message}
      />
      <Input
        label="Email"
        type="email"
        {...register("email")}
        error={errors.email?.message}
      />

      <Input
        label="Password"
        type="password"
        {...register("password")}
        error={errors.password?.message}
      />

      <Input
        label="Retype Password"
        type="password"
        {...register("retypePassword")}
        error={errors.retypePassword?.message}
      />

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Creating account..." : "Sign Up"}
      </Button>

      <div className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link href="/log-in" className="text-primary underline">
          Log in here
        </Link>
      </div>
    </form>
  );
}
