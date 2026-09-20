import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const accessToken = searchParams.get("accessToken");
  const refreshToken = searchParams.get("refreshToken");

  // The 'redirect' param will already contain your `?loggedIn=true` string
  // from your GoogleAuthButton component
  const redirectPath = searchParams.get("redirect") || "";

  // Await cookies() in Next.js 15+
  const cookieStore = await cookies();
  const isProduction = process.env.NODE_ENV === "production";

  if (accessToken) {
    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax", // Lax works perfectly because the cookie is now on kafuur.com
      path: "/",
      maxAge: 24 * 60 * 60, // 1 day (in seconds for Next.js cookies)
    });
  }

  if (refreshToken) {
    cookieStore.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      path: "/",
      maxAge: 30 * 24 * 60 * 60, // 30 days
    });
  }

  // Redirect the browser to the final destination (e.g., /?loggedIn=true)
  return NextResponse.redirect(new URL(`/${redirectPath}`, request.url));
}
