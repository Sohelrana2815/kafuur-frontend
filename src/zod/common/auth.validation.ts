// @/zod/admin/adminAuth.validation.ts
import { z } from "zod";

// Create User Zod Schema
export const createUserSchema = z.object({
  name: z
    .string({ error: "Full name is required" })
    .nonempty("Full name is required")
    .min(3, "Full name is too short!")
    .max(30, "Full name is too long"),
  email: z.email("Invalid email format or missing the email field"),
  password: z
    .string({ error: "Password is required" })
    .nonempty("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain a number"),
});
// Login User Zod Schema
export const loginUserSchema = z.object({
  email: z.email("Invalid email format or missing the email field").trim(),

  password: z
    .string({ error: "Password is required" })
    .nonempty("Password is required"),
});
