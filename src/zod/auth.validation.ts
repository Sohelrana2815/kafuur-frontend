// @/zod/admin/adminAuth.validation.ts
import { z } from "zod";


// Login User Zod Schema
export const loginUserSchema = z.object({
  email: z.email("Invalid email format or missing the email field").trim(),

  password: z
    .string({ error: "Password is required" })
    .nonempty("Password is required"),
});
