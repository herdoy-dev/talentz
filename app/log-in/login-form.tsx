"use client";
import { setAuthToken } from "@/actions/set-token";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import apiClient from "@/services/api-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

type FormSchemaType = z.infer<typeof FormSchema>;

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

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

interface TokenInterface {
  value: string;
  role: string;
}

export default function LoginForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const setRedirectRoute = (role: string) => {
    if (role === "client") return "/buyer";
    if (role === "freelancer") return "/seller";
    if (role === "admin") return "/admin";
    return "/";
  };

  const onSubmit = async (data: FormSchemaType) => {
    try {
      const { data: token } = await apiClient.post<TokenInterface>(
        "/auth/log-in",
        data
      );
      await setAuthToken(token.value);
      form.reset();
      toast.success("Log In Success");
      const redirectUrl = setRedirectRoute(token.role);
      router.push(redirectUrl);
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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full md:w-2/3 space-y-6"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address:</FormLabel>
              <FormControl>
                <Input placeholder="Email Address" type="email" {...field} />
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
        <Button className="w-full" type="submit">
          Sign In
        </Button>
      </form>
    </Form>
  );
}
