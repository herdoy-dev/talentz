"use client";
import { Button } from "@/components/button";
import Input from "@/components/ui/input";
import TextArea from "@/components/ui/text-area";
import apiClient from "@/services/api-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Flex } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

type FormSchemaType = z.infer<typeof FormSchema>;
const FormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().min(5).email("Invalid email address"),
  phone: z.string(),
  title: z.string(),
  location: z.string(),
  about: z.string().min(1, "About is required"),
});

export default function ProfileForm() {
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
    <form className="space-y-4 mb-10" onSubmit={handleSubmit(onSubmit)}>
      <Flex align="center" gap="3" className="w-full">
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
      </Flex>
      <Flex align="center" gap="3" className="w-full">
        <Input
          label="Email"
          type="email"
          {...register("email")}
          error={errors.email?.message}
        />
        <Input
          label="Phone Number"
          type="text"
          {...register("phone")}
          error={errors.phone?.message}
        />
      </Flex>
      <Flex align="center" gap="3" className="w-full">
        <Input
          label="Your Title"
          type="text"
          {...register("title")}
          error={errors.title?.message}
        />
        <Input
          label="Loaction Based"
          type="text"
          {...register("location")}
          error={errors.location?.message}
        />
      </Flex>
      <TextArea
        label="About"
        {...register("about")}
        error={errors.about?.message}
      />
      <Button type="submit" className="px-10">
        Save
      </Button>
    </form>
  );
}
