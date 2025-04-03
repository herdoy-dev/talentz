"use client";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import TextArea from "@/components/ui/text-area";
import apiClient from "@/services/api-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const FormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
});

type FormSchemaType = z.infer<typeof FormSchema>;

export default function ContactForm() {
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
      await apiClient.post("/contacts", data);
      reset();
      toast.success("Message sent successfully! 🚀");
    } catch (error) {
      toast.error("Oops! Something went wrong.");
      console.log(error);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="First Name"
        {...register("firstName")}
        error={errors.firstName?.message}
      />
      <Input
        label="Last Name"
        {...register("lastName")}
        error={errors.lastName?.message}
      />
      <Input
        label="Email"
        type="email"
        {...register("email")}
        error={errors.email?.message}
      />
      <TextArea
        label="Message"
        {...register("message")}
        error={errors.message?.message}
      />
      <Button type="submit" className="float-end">
        Submit
      </Button>
    </form>
  );
}
