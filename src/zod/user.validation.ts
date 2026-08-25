import z from "zod";

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
// Update User Zod Schema
export const updateUserZodSchema = z.object({
  name: z
    .string()
    .min(3, "Full name is too short!")
    .max(30, "Full name is too long")
    .optional(),

  phone: z
    .string()
    .min(11, "Phone number must be at least 11 digits")
    .max(15, "Phone number is too long")
    .optional(),

  altPhone: z
    .string()
    .min(11, "Alternative phone number must be at least 11 digits")
    .max(15, "Alternative phone number is too long")
    .optional(),

  city: z
    .string()
    .min(2, "City name is too short")
    .max(50, "City name is too long")
    .optional(),

  thana: z
    .string()
    .min(2, "Thana name is too short")
    .max(50, "Thana name is too long")
    .optional(),
  address: z
    .string()
    .min(3, "Address is too short")
    .max(255, "Address is too long")
    .optional(),
});
