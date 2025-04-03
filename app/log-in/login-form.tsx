"use client";
import { setAuthToken } from "@/actions/set-token";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import apiClient from "@/services/api-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const FormSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(64, "Password must not exceed 64 characters"),
});

type FormSchemaType = z.infer<typeof FormSchema>;

export default function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (data: FormSchemaType) => {
    try {
      const { data: token } = await apiClient.post<string>(
        "/auth/log-in",
        data
      );
      await setAuthToken(token);
      reset();
      toast.success("Log In Success");
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
      toast.error("Oops! Something went wrong.");
    }
  };

  return (
    <form className="space-y-4 w-full" onSubmit={handleSubmit(onSubmit)}>
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
      <Button type="submit" className="w-full">
        Log In
      </Button>

      <div className="text-center text-sm text-gray-600">
        Don&apos;t have an account?{" "}
        <Link href="/sign-up" className="text-primary underline">
          Sign Up here
        </Link>
      </div>
    </form>
  );
}
