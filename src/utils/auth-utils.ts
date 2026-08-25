export type UserRole = "ADMIN" | "CUSTOMER";

// exact : ["/my-profile","/settings"]
// patterns: [/^\/dashboard/, /^\/admin/], // Routes starting with /dashboard/* /admin/*

export type RouteConfig = {
  exact: string[];
  patterns: RegExp[];
};

export const authRoutes = ["/login", "/register"];

export const commonProtectedRoutes: RouteConfig = {
  exact: ["/my-profile", "/my-orders", "/change-password", "/cart"],
  patterns: [], // [/password/change-password, /password/reset-password => /password/*]
};

export const adminProtectedRoutes: RouteConfig = {
  exact: [], // "/admins"
  patterns: [/^\/admin/], // Routes starting with /admin/*
};

export const customerProtectedRoutes: RouteConfig = {
  exact: [], // "/dashboard"
  patterns: [/^\/dashboard/], // Routes starting with /dashboard/*
};

export const isAuthRoute = (pathname: string) => {
  return authRoutes.some((route) => route === pathname); // It will return true/false
};

// For protected routes / Private routes
export const isRouteMatches = (
  pathname: string,
  routes: RouteConfig,
): boolean => {
  if (routes.exact.includes(pathname)) {
    return true;
  }
  return routes.patterns.some((pattern: RegExp) => pattern.test(pathname));
  // if pathname === /dashboard/my-orders => matches /^\/dashboard/ => true
};

export const getRouteOwner = (
  pathname: string,
): "ADMIN" | "CUSTOMER" | "COMMON" | null => {
  if (isRouteMatches(pathname, adminProtectedRoutes)) {
    return "ADMIN";
  }
  if (isRouteMatches(pathname, customerProtectedRoutes)) {
    return "CUSTOMER";
  }
  if (isRouteMatches(pathname, commonProtectedRoutes)) {
    return "COMMON";
  }
  return null;
};

export const getDefaultDashboardRoute = (role: UserRole): string => {
  if (role === "ADMIN") {
    return "/admin/dashboard";
  }
  if (role === "CUSTOMER") {
    return "/dashboard";
  }

  return "/";
};

export const isValidRedirectForRole = (
  redirectPath: string,
  role: UserRole,
): boolean => {
  const routeOwner = getRouteOwner(redirectPath);

  if (routeOwner === null || routeOwner === "COMMON") {
    return true;
  }

  if (routeOwner === role) {
    return true;
  }

  return false;
};
