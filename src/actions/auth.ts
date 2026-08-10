// @/actions/admin.ts
"use server";

import { cookies } from "next/headers";
import { validatedAction } from "@/lib/action-utils";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export const loginAdminAction = validatedAction(
  loginAdminSchema,
  async (validatedData) => {
    // 1. The data is already validated and typed! Just proceed to fetch.
    const response = await fetch(`${baseUrl}/admin-auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // validatedData maps perfectly to your backend's req.body
      body: JSON.stringify(validatedData), 
      cache: "no-store",
    });

    const resData = await response.json().catch(() => null);

    if (!response.ok) {
      return {
        success: false,
        message: resData?.message || "Invalid authentication credentials provided.",
      };
    }

    const resultData = resData?.data;
    const token = resultData?.accessToken;

    if (!token) {
      return {
        success: false,
        message: "Authorization token was omitted from the server response payload.",
      };
    }

    // 2. Save the token
    const cookieStore = await cookies();
    cookieStore.set("accessToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60,
      path: "/",
    });

    // 3. Return Success
    return {
      success: true,
      message: resData?.message || "Administrative Authorization Successful!",
      data: resultData,
    };
  }
);