import { z } from "zod";

export const SignupFormSchema = z
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
      .min(8, { message: "Password must be at least 8 characters long." })
      .max(100, {
        message: "Password must be no more than 100 characters long.",
      })
      .refine((val) => val.trim().length > 0, {
        message: "Password is required.",
      }),

    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long." })
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

export type SignupFormValues = z.infer<typeof SignupFormSchema>;
