import { prisma } from "@/prisma/client";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Define the user schema for validation
const userSchema = z.object({
  name: z.string().min(1, "Name is required").max(255, "Name is too long"),
  email: z
    .string()
    .email("Invalid email format")
    .min(1, "Email is required")
    .max(255, "Email is too long"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(100, "Password is too long"),
  role: z.enum(["CLIENT", "FREELANCER"]),
});

// Type for the user data
type UserData = z.infer<typeof userSchema>;

// Utility function to validate user data
const validateUserData = (
  data: unknown
): { success: boolean; data?: UserData; error?: z.ZodError } => {
  const result = userSchema.safeParse(data);
  if (!result.success) {
    return { success: false, error: result.error };
  }
  return { success: true, data: result.data };
};

// Utility function to hash the password
const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// GET endpoint to fetch users excluding the one with the provided email
export const GET = async (request: NextRequest): Promise<NextResponse> => {
  try {
    const { email } = await request.json();
    const users = await prisma.user.findMany({
      where: {
        NOT: {
          email,
        },
      },
    });

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
};

// POST endpoint to create a new user
export const POST = async (request: NextRequest): Promise<NextResponse> => {
  try {
    const body = await request.json();
    const validationResult = validateUserData(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error?.errors[0].message },
        { status: 400 }
      );
    }

    const { name, email, password, role } = validationResult.data!;

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create a new user
    const newUser = await prisma.user.create({
      data: { name, email, role, password: hashedPassword },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
};
