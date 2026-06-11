/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import axios from "axios";
import {
  loginAdminSchema,
  registerAdminSchema,
} from "@/zod/admin/adminAuth.validation";
import { cookies } from "next/headers";
import z from "zod";

export type ActionState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  data?: any;
} | null;

/**
 * Server Action wrapper targeting the Node/Express backend pipeline.
 */
export async function registerAdminAction(
  prevState: ActionState,
  payload: z.infer<typeof registerAdminSchema>,
): Promise<ActionState> {
  // 1. Perform server-side runtime fallback sanitation
  const validatedFields = registerAdminSchema.safeParse(payload);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Client input failed schema integrity verification tests.",
      errors: validatedFields.error.flatten().fieldErrors as Record<
        string,
        string[]
      >,
    };
  }

  try {
    // 2. Fetch active auth credentials from the user's browser context
    const cookieStore = await cookies();

    // NOTE: Change "accessToken" to the exact cookie key name your Express API looks for
    const adminToken = cookieStore.get("accessToken")?.value || "";

    // 3. Dispatch validated payload to Express server using Axios
    const response = await axios.post(
      "http://localhost:5000/api/v1/admin-auth/register",
      validatedFields.data,
      {
        headers: {
          "Content-Type": "application/json",
          // Pass the token inside headers if your backend uses Bearer authentication
          Authorization: `Bearer ${adminToken}`,
          // Pass the cookie manually since Axios on server doesn't auto-forward client cookie strings
          Cookie: `accessToken=${adminToken}`,
        },
        withCredentials: true,
      },
    );

    return {
      success: true,
      message:
        response.data?.message ||
        "New Administrator account spawned successfully!",
      data: response.data?.data,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Server Action Exception Error:", error);

    // Capture explicit responses raised by your catchAsync/AppError layer
    const backendMessage =
      error.response?.data?.message || "Failed to finalize admin registration.";

    return {
      success: false,
      message: backendMessage,
    };
  }
}

export async function loginAdminAction(
  prevState: ActionState,
  payload: z.infer<typeof loginAdminSchema>,
): Promise<ActionState> {
  // 1. Validate fields with your existing login schema
  const validatedFields = loginAdminSchema.safeParse(payload);

  if (!validatedFields.success) {
    return {
      success: false,
      message:
        "Please ensure your credentials follow standard validation guidelines.",
      errors: validatedFields.error.flatten().fieldErrors as Record<
        string,
        string[]
      >,
    };
  }

  try {
    // 2. Query the Express backend login API
    const response = await axios.post(
      "http://localhost:5000/api/v1/admin-auth/login",
      validatedFields.data,
      {
        withCredentials: true,
      },
    );

    const resultData = response.data?.data;
    const token = resultData?.accessToken;

    if (!token) {
      return {
        success: false,
        message:
          "Authorization token was omitted from the server response payload.",
      };
    }

    // 3. Save the token on the Next.js side so the browser persists it
    const cookieStore = await cookies();
    cookieStore.set("accessToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60, // 15 minutes (matches your Express settings)
      path: "/", // Available globally across your admin layout routes
    });

    return {
      success: true,
      message:
        response.data?.message || "Administrative Authorization Successful!",
      data: resultData,
    };
  } catch (error: any) {
    console.error("Login Server Action Error:", error);
    const backendMessage =
      error.response?.data?.message ||
      "Invalid authentication credentials provided.";

    return {
      success: false,
      message: backendMessage,
    };
  }
}


