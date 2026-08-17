/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { createUserSchema } from "@/zod/user.validation";
import { loginAction } from "../auth/auth.service";
import { serverFetch } from "@/lib/server-fetch";

// Login Server Action

export const registerAction = async (
  _currentState: any,
  formData: FormData,
) => {
  try {
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };
    // 1. Zod Validation
    const validatedFields = createUserSchema.safeParse(payload);

    if (!validatedFields.success) {
      return {
        success: false,
        errors: validatedFields.error.issues.map((issue) => {
          return {
            field: issue.path[0],
            message: issue.message,
          };
        }),
      };
    }
    // 2. Fetch from Backend
    const res = await serverFetch.post("/users/register", {
      body: JSON.stringify(validatedFields.data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();
    if (!res.ok || !result.success) {
      return {
        success: false,
        message: result.message || "Invalid credentials. Please try again.",
      };
    }

    if (result.success) {
      await loginAction(_currentState, formData);
    }

    return result;
  } catch (error: any) {
    console.log("Login error:", error);
    // Re-throw NEXT_REDIRECT errors so navigation works
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    return {
      success: false,
      message: error.message || "An unexpected error occurred.",
    };
  }
};
