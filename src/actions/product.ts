/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { createProductZodSchema } from "@/zod/common/product.validation";
import axios from "axios";
import { cookies } from "next/headers";
import api from "@/lib/api";
import { updateTag } from "next/cache";
import { redirect } from "next/navigation";

export type ActionState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  data?: any;
} | null;

export async function createProductAction(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  // 1. Text data
  const textData = {
    name: formData.get("name") as string,
    slug: formData.get("slug") as string,
    shortDescription: formData.get("shortDescription") as string,
    longDescription: formData.get("longDescription") as string,
    price: Number(formData.get("price")),
    category: formData.get("category") as "MEN" | "WOMEN",
  };

  // Skip check the images from Zod
  const validatedFields = createProductZodSchema
    .omit({ images: true })
    .safeParse(textData);

  if (!validatedFields.success) {
    const formattedErrors: Record<string, string[]> = {};

    validatedFields.error.issues.forEach((issue) => {
      const fieldName = issue.path[0] as string;
      if (fieldName) {
        if (!formattedErrors[fieldName]) {
          formattedErrors[fieldName] = [];
        }
        formattedErrors[fieldName].push(issue.message);
      }
    });

    return {
      success: false,
      message: "Form entry validation failed.",
      errors: formattedErrors,
    };
  }

  // 2. Fetch the uploaded files out of the form data
  const fileAssets = formData.getAll("files") as File[];
  const activeFiles = fileAssets.filter(
    (file) => file.name !== "" && file.size > 0,
  );

  if (activeFiles.length === 0) {
    return {
      success: false,
      message: "At least one product image is required",
      errors: {
        files: ["Please select at least one image file to upload."],
      },
    };
  }
  try {
    // 3. Acquire administrative session cookies
    const cookieStore = await cookies();
    const adminToken = cookieStore.get("accessToken")?.value || "";
    if (!adminToken) {
      return { success: false, message: "Unauthorized User" };
    }

    // 4. Construct a compliant outbound Multipart payload mirroring your backend constraints
    const backendPayload = new FormData();

    // Convert text properties to a text field string matching: JSON.parse(req.body.data)
    backendPayload.append("data", JSON.stringify(validatedFields.data));

    // Append binary objects into the multi-file pool matching: multerUpload.array("files")
    activeFiles.forEach((file) => {
      backendPayload.append("files", file);
    });

    // 5. Send payload to your core Express controller route
    const res = await api.post("/products", backendPayload, {
      headers: {
        "Content-Type": "multipart/form-data",
        Cookie: `accessToken=${adminToken}`,
      },
    });
    if (res.status === 201) {
      updateTag("PRODUCTS");
    }

    return {
      success: true,
      message: res.data?.message || "Product Created Successfully",
      data: res.data?.data,
    };
  } catch (error: any) {
    console.error("Product creation transaction error exception:", error);

    return {
      success: false,
      message:
        error.response?.data?.message || "Failed to create a new product.",
    };
  }
}

export async function getAllProducts() {
  try {
    // 1. Fixed string interpolation slash
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/products`,
      {
        next: {
          tags: ["PRODUCTS"],
        },
      },
    );

    // 2. Always check if the response status is OK before parsing
    if (!res.ok) {
      console.error(`Fetch failed with status: ${res.status}`);
      return { success: false, data: [] };
    }

    // 3. Await the JSON parsing
    const result = await res.json();

    // 4. Check the parsed data (resData, not res.data)
    if (result?.success) {
      return {
        success: true,
        data: result.data,
      };
    }
    return { success: false, data: [] };
  } catch (error: any) {
    console.error("Error fetching public products:", error);
    return { success: false, data: [] };
  }
}
// Add to your existing src/actions/product.ts file
export async function getProductById(id: string) {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/v1/products/${id}`,
    );

    if (response.data?.success) {
      return {
        success: true,
        data: response.data.data, // Contains the single product object
      };
    }
    return { success: false, data: null };
  } catch (error: any) {
    console.error(`Error fetching product ID ${id}:`, error);
    return { success: false, data: null };
  }
}
