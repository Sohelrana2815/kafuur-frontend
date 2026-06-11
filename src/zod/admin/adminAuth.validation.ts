// src/validations/admin.validation.ts
import { z } from "zod";

export const registerAdminSchema = z.object({
  username: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must not exceed 50 characters"),

  // CHANGE THIS: z.email() does not exist. It must be z.string().email()
  email: z.email("Invalid email address"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/,
      "Password must contain uppercase, lowercase, and number",
    ),
});

export const loginAdminSchema = z.object({
  // CHANGE THIS TOO
  email: z.email("Invalid email address"),

  password: z.string().min(1, "Password is required"),
});
