/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";

export async function getAdminDashboardStats() {
  try {
    const res = await serverFetch.get("/dashboard/admin", {
      cache: "no-store",
    });
    const result = await res.json();
    console.log(result);
    return result;
  } catch (error: any) {
    console.error("Error fetching admin stats:", error);
    return { success: false, data: null };
  }
}

export async function getCustomerDashboardStats() {
  try {
    const res = await serverFetch.get("/dashboard/customer", {
      cache: "no-store",
    });
    const result = await res.json();
    return result;
  } catch (error: any) {
    console.error("Error fetching customer stats:", error);
    return { success: false, data: null };
  }
}
