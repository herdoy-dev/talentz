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
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Container, Flex, Grid } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { FaPhone } from "react-icons/fa6";
import { GrMail } from "react-icons/gr";
import { toast } from "sonner";
import { z } from "zod";

// Define the form schema using Zod
const FormSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." })
    .max(50, { message: "First name must be less than 50 characters." }),

  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." })
    .max(50, { message: "Last name must be less than 50 characters." }),

  email: z
    .string()
    .email({ message: "Please enter a valid email address." })
    .min(5, { message: "Email must be at least 5 characters." })
    .max(100, { message: "Email must be less than 100 characters." }),

  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." })
    .max(1000, { message: "Message must be less than 1000 characters." }),
});

// Define the type for the form values
type FormValues = z.infer<typeof FormSchema>;

export function Contact() {
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      // Simulate an API call or any async operation
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Your message has been sent successfully!", {
        description: "We will get back to you soon.",
      });
      console.log(data);
      // Reset the form after successful submission
      form.reset();
    } catch (error) {
      toast.error("Failed to send message", {
        description: "Please try again later.",
      });
    }
  };

  return (
    <Container className="flex items-center justify-center p-4">
      <Grid
        columns={{ initial: "1", md: "3fr 5fr" }}
        className="md:my-20 my-10 w-full md:w-[960px]"
        gap="8"
      >
        <div className="flex flex-col gap-5">
          <div>
            <h1 className="text-2xl font-bold">Contact Us</h1>
            <p className="text-gray-600">
              Have Questions? We&apos;re Here to Help!
            </p>
          </div>

          <div className="space-y-3">
            <Flex align="center" className="text-primary" gap="2">
              <GrMail /> <span>info@talentz.com</span>
            </Flex>
            <Flex align="center" className="text-primary" gap="2">
              <FaPhone /> <span>(+852) 1234 5678</span>
            </Flex>
          </div>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal">First Name</FormLabel>
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
                  <FormLabel className="font-normal">Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Last Name" {...field} />
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
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal">Message</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Type Your Message" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="px-8 float-end"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </Form>
      </Grid>
    </Container>
  );
}
