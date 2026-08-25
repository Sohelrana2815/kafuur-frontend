/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { IEditProfile } from "@/types/user.interface";
import {
  getDefaultDashboardRoute,
  isValidRedirectForRole,
  UserRole,
} from "@/utils/auth-utils";
import { loginUserSchema } from "@/zod/auth.validation";
import { parseCookie } from "cookie";
import jwt, { JwtPayload } from "jsonwebtoken";
import { redirect } from "next/navigation";
import { deleteCookie, setCookie } from "./tokenHandlers";
import { updateUserZodSchema } from "@/zod/user.validation";
// Login Server Action

export const loginAction = async (_currentState: any, formData: FormData) => {
  try {
    const redirectTo = formData.get("redirect") || null;
    let accessTokenObject: null | any = null;
    let refreshTokenObject: null | any = null;

    const payload = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    // 1. Zod Validation
    const validatedFields = loginUserSchema.safeParse(payload);

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
    //     if (zodValidator(payload, loginUserSchema).success === false) {
    //           return zodValidator(payload, loginUserSchema);
    //       }
    //  const validatedPayload = zodValidator(payload, loginUserSchema).data;
    // 2. Fetch from Backend
    const res = await serverFetch.post("/auth/login", {
      body: JSON.stringify(validatedFields.data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // const res = await fetch(
    //   `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/login`,
    //   {
    //     method:"POST",
    //     body: JSON.stringify(payload),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   },
    // );
    const result = await res.json();
    if (!res.ok || !result.success) {
      return {
        success: false,
        message: result.message || "Invalid credentials. Please try again.",
      };
    }

    // 3. Process Cookies (Only runs if login was successful)
    const setCookieHeaders = res.headers.getSetCookie(); // [accessToken,refreshToken]

    if (setCookieHeaders && setCookieHeaders.length > 0) {
      setCookieHeaders.forEach((cookie: string) => {
        // console.log("Each cookie: ", cookie);
        const parsedCookie = parseCookie(cookie);
        if (parsedCookie["accessToken"]) {
          accessTokenObject = parsedCookie;
        }
        if (parsedCookie["refreshToken"]) {
          refreshTokenObject = parsedCookie;
        }
        console.log("Parsed Cookie:", parsedCookie);
      });
    } else {
      // show simple message
      throw new Error("Login succeeded, but no cookies were returned.");
    }
    // console.log(setCookieHeaders);

    if (!accessTokenObject) {
      throw new Error("Unauthorized access.");
    }
    if (!refreshTokenObject) {
      throw new Error("Unauthorized access.");
    }
    // 4. Set Cookies in Next.js
    await setCookie("accessToken", accessTokenObject.accessToken, {
      httpOnly: true,
      secure: true,
      maxAge: parseInt(accessTokenObject["Max-Age"]) || 60 * 60 * 60 * 1000, // 1 day
      path: accessTokenObject.Path || "/",
      sameSite: accessTokenObject.SameSite || "strict",
    });
    await setCookie("refreshToken", refreshTokenObject.refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge:
        parseInt(refreshTokenObject["Max-Age"]) || 30 * 60 * 60 * 60 * 1000, // 30 days
      path: refreshTokenObject.Path || "/",
      sameSite: refreshTokenObject.SameSite || "strict",
    });
    // 5. Verify Token & Role
    const verifiedToken: JwtPayload | string = jwt.verify(
      accessTokenObject.accessToken,
      process.env.JWT_ACCESS_SECRET as string,
    );
    if (typeof verifiedToken === "string") {
      throw new Error("Unauthorized");
    }
    const userRole: UserRole = verifiedToken.role;

    // 6. Redirect User
    if (redirectTo) {
      const requestedPath = redirectTo.toString();
      if (isValidRedirectForRole(requestedPath, userRole)) {
        redirect(`${requestedPath}?loggedIn=true`);
      } else {
        redirect(`${getDefaultDashboardRoute(userRole)}?loggedIn=true`);
      }
    } else {
      redirect(`${getDefaultDashboardRoute(userRole)}?loggedIn=true`);
    }
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

export const logoutUser = async () => {
  await deleteCookie("accessToken");
  await deleteCookie("refreshToken");

  redirect("/login?loggedOut=true");
};

export async function getMyProfile() {
  try {
    const res = await serverFetch.get("/users/me");
    const result = await res.json();

    // console.log("From Get Product Server Action:", res);
    if (!res.ok || !result.success) {
      return {
        success: false,
        message: result.message || "Failed to retrieved profile information",
      };
    }
    return {
      success: true,
      message: result.message || "Profile information retrieved successfully",
      data: result.data,
    };
  } catch (error: any) {
    console.error("Error retrieving profile information", error);
    return {
      success: false,
      message: error.message || "An unexpected error occurred.",
    };
  }
}

export async function updateMyProfile(_prevState: any, formData: FormData) {
  try {
    // const payload: Partial<IEditProfile> = {
    //   name: formData.get("name") as string,
    //   phone: formData.get("phone") as string,
    //   altPhone: formData.get("altPhone") as string,
    //   thana: formData.get("thana") as string,
    //   city: formData.get("city") as string,
    //   address: formData.get("address") as string,
    // };

    const fields = [
      "name",
      "phone",
      "altPhone",
      "thana",
      "city",
      "address",
    ] as const;

    const payload: Partial<IEditProfile> = {};

    for (const field of fields) {
      const value = formData.get(field); // = "Sohel Rana"

      if (typeof value === "string" && value.trim() !== "") {
        payload[field] = value.trim();
      }
    }

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

    const res = await serverFetch.patch("/users/me", {
      body: JSON.stringify(validatedPayload.data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await res.json();
    // console.log("From Update Product Action:", res);
    if (!res.ok || !result.success) {
      return {
        success: false,
        message: result.message || "Failed to update profile",
      };
    }
    return {
      success: true,
      message: result.message || "Profile updated successfully",
      data: result.data,
    };
    // 5. Explicitly return success state to client
    // return result;
  } catch (error: any) {
    console.error("Error Updating profile:", error);
    return {
      success: false,
      message: error.message || "An unexpected error occurred.",
    };
  }
}
