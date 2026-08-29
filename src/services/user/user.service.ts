"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { serverFetch } from "@/lib/server-fetch";
import { IUser } from "@/types/user.interface";
import { UserRole } from "@/utils/auth-utils";
import { createUserSchema, updateUserZodSchema } from "@/zod/user.validation";
import { loginAction } from "../auth/auth.service";

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

// Get All Users

export const getAllUsers = async (queryString?: string) => {
  try {
    // 1. Fetch from Backend
    const res = await serverFetch.get(
      `/users${queryString ? `?${queryString}` : ""}`,
    );
    const result = await res.json();
    if (!res.ok || !result.success) {
      return {
        success: false,
        message: result.message || "Failed to retrieved users",
      };
    }
    return {
      success: true,
      message: result.message || "Users retrieved successfully",
      meta: result.meta,
      data: result.data,
    };
  } catch (error: any) {
    console.error("Error retrieving users:", error);
    return {
      success: false,
      message: error.message || "An unexpected error occurred.",
    };
  }
};

// Update User by Admin
export const updateUserByAdmin = async (
  id: string,
  _currentState: any,
  formData: FormData,
) => {
  try {
    // 1. Extract fields based on IEditUserByAdmin interface
    const payload: Partial<IUser> = {
      name: formData.get("name") as string,
      role: formData.get("role") as UserRole, // Cast to UserRole based on your imports
      status: formData.get("status") as
        | "ACTIVE"
        | "BLOCKED"
        | "BANNED"
        | "DELETED",
      isVerified: formData.get("isVerified") === "true",
      phone: formData.get("phone") as string,
      altPhone: formData.get("altPhone") as string,
      city: formData.get("city") as string,
      thana: formData.get("thana") as string,
      address: formData.get("address") as string,
    };

    // 2. Zod Validation (Make sure to import your specific update schema, e.g., updateUserSchema)
    const validatedPayload = updateUserZodSchema.safeParse(payload);

    if (!validatedPayload.success) {
      return {
        success: false,
        errors: validatedPayload.error.issues.map((issue) => {
          return {
            field: issue.path[0],
            message: issue.message,
          };
        }),
      };
    }

    // 3. Fetch from Backend using JSON
    const res = await serverFetch.patch(`/users/${id}`, {
      body: JSON.stringify(validatedPayload.data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        message: result.message || "Failed to update user.",
      };
    }

    return {
      success: true,
      message: result.message || "User updated successfully by Admin.",
      data: result.data,
    };
  } catch (error: any) {
    console.error(`Error updating user (${id}):`, error);

    return {
      success: false,
      message: error.message || "An unexpected error occurred.",
    };
  }
};
