import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getDefaultDashboardRoute, getRouteOwner, isAuthRoute, UserRole } from "./utils/auth-utils";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { deleteCookie, getCookie } from "./services/auth/tokenHandlers";

// This function can be marked `async` if using `await` inside
export default async function proxy(request: NextRequest) {
 const pathname = request.nextUrl.pathname;

//  const accessToken = request.cookies.get("accessToken")?.value || null;
const accessToken = await getCookie("accessToken")

 let userRole: UserRole | null = null;


  if(accessToken){
  const verifiedToken: JwtPayload | string = jwt.verify(accessToken,process.env.JWT_ACCESS_SECRET as string)

     if (typeof verifiedToken === "string") {
            // cookieStore.delete("accessToken");
            // cookieStore.delete("refreshToken");
            await deleteCookie("accessToken")
            await deleteCookie("refreshToken")
            return NextResponse.redirect(new URL('/login', request.url));
        }
    userRole = verifiedToken.role;
}
 const routerOwner = getRouteOwner(pathname);
    //path = /admin/all-users => "ADMIN"
    //path = /my-profile => "COMMON"
    //path = /login => null
 const isAuth = isAuthRoute(pathname)

 // Rule 1 : User is logged in and trying to access auth routes (login/register). Redirect to default dashboard
 if (accessToken && isAuth) {
        return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole as UserRole), request.url))
    }
       // Rule 2 : User is trying to access open public route
    if (routerOwner === null) {
        return NextResponse.next();
    }

     // Rule 1 & 2 for open public routes and auth routes

    if (!accessToken) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(loginUrl);
    }

    // Rule 3 : User is trying to access common protected route
    if (routerOwner === "COMMON") {
        return NextResponse.next();
    }

 // Rule 4 : User is trying to access role based protected route
    if (routerOwner === "ADMIN" || routerOwner === "CUSTOMER") {
        if (userRole !== routerOwner) {
            return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole as UserRole), request.url))
        }
    }
    console.log(userRole);


 return NextResponse.next();

}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)",
  ],
};
