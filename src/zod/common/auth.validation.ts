// @/zod/admin/adminAuth.validation.ts
import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Invalid email format"),
  password: z.string().min(1, { message: "Password is required" }),
});