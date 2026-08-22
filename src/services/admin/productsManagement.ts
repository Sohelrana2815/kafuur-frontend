"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { serverFetch } from "@/lib/server-fetch";
import { IBackendProduct } from "@/types/product.types";
import {
  createProductZodSchema,
  updateProductZodSchema,
} from "@/zod/product.validation";

// CRUD OPERATIONS FOR PRODUCTS MANAGEMENT

export const createProduct = async (_currentState: any, formData: FormData) => {
  try {
    const payload: IBackendProduct = {
      name: formData.get("name") as string,
      shortDescription: formData.get("shortDescription") as string,
      longDescription: formData.get("longDescription") as string,
      price: Number(formData.get("price")),
      category: formData.get("category") as "MEN" | "WOMEN",
    };
    // console.log(payload);
    const validatedPayload = createProductZodSchema.safeParse(payload);

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

    // console.log(validatedPayload.data);
    const newFormData = new FormData();
    newFormData.append("data", JSON.stringify(validatedPayload.data));

    const files = formData.getAll("files") as File[];
    files.forEach((file) => {
      if (file instanceof File && file.size > 0) {
        newFormData.append("files", file);
      }
    });
    const res = await serverFetch.post("/products", {
      body: newFormData,
    });
    // console.log("From Create Product Action:", res);
    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        message: result.message || "Failed to create product",
      };
    }
    // 5. Explicitly return success state to client
    return {
      success: true,
      message: result.message || "Product created successfully",
      data: result.data,
    };
  } catch (error: any) {
    console.error("Error creating product:", error);
    return {
      success: false,
      message: error.message || "An unexpected error occurred.",
    };
  }
};

export async function getProducts(queryString?: string) {
  try {
    const res = await serverFetch.get(
      `/products${queryString ? `?${queryString}` : ""}`, // category=MEN
    );

    const result = await res.json();

    // console.log("From Get Product Server Action:", res);
    if (!res.ok || !result.success) {
      return {
        success: false,
        message: result.message || "Failed to retrieved products",
      };
    }
    return {
      success: true,
      message: result.message || "Products retrieved successfully",
      meta: result.meta,
      data: result.data,
    };
  } catch (error: any) {
    console.error("Error retrieving products:", error);
    return {
      success: false,
      message: error.message || "An unexpected error occurred.",
    };
  }
}

export const updateProduct = async (
  id: string,
  _prevState: any,
  formData: FormData,
) => {
  try {
    const payload: Partial<IBackendProduct> = {
      name: formData.get("name") as string,
      // slug: formData.get("slug") as string,
      shortDescription: formData.get("shortDescription") as string,
      longDescription: formData.get("longDescription") as string,
      price: Number(formData.get("price")),
      category: formData.get("category") as "MEN" | "WOMEN",
    };

    const validatedPayload = updateProductZodSchema.safeParse(payload);

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
    const newFormData = new FormData();
    newFormData.append("data", JSON.stringify(validatedPayload.data));

    const files = formData.getAll("files") as File[];
    files.forEach((file) => {
      if (file instanceof File && file.size > 0) {
        newFormData.append("files", file);
      }
    });
    const res = await serverFetch.patch(`/products/${id}`, {
      body: newFormData,
    });

    const result = await res.json();
    // console.log("From Update Product Action:", res);
    if (!res.ok || !result.success) {
      return {
        success: false,
        message: result.message || "Failed to update product",
      };
    }
    return {
      success: true,
      message: result.message || "Product updated successfully",
      data: result.data,
    };
    // 5. Explicitly return success state to client
    // return result;
  } catch (error: any) {
    console.error("Error creating product:", error);
    return {
      success: false,
      message: error.message || "An unexpected error occurred.",
    };
  }
};

export async function softDeleteProduct(id: string) {
  try {
    const res = await serverFetch.patch(`/products/soft/${id}`);
    const result = await res.json();
    if (!res.ok || !result.success) {
      return {
        success: false,
        message: result.message || "Failed to create product",
      };
    }
    return {
      success: true,
      message: result.message || "Product soft-deleted successfully",
      data: result.data,
    };
  } catch (error: any) {
    console.error("Error creating product:", error);
    return {
      success: false,
      message: error.message || "An unexpected error occurred.",
    };
  }
}
export async function deleteProduct(id: string) {
  try {
    const res = await serverFetch.delete(`/products/${id}`);
    const result = await res.json();
    if (!res.ok || !result.success) {
      return {
        success: false,
        message: result.message || "Failed to create product",
      };
    }
    return {
      success: true,
      message: result.message || "Product deleted successfully",
      data: result.data,
    };
  } catch (error: any) {
    console.error("Error creating product:", error);
    return {
      success: false,
      message: error.message || "An unexpected error occurred.",
    };
  }
}
