/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import axios from "axios";
import { cookies } from "next/headers";
import z from "zod";

// Create a safe validation schema for the Server Action execution
// We omit the runtime 'images' array check here because images are validated on the server as binary files
const createProductFormSchema = z.object({
  name: z.string().min(3, "Product name is too short!").max(100),
  slug: z
    .string()
    .min(5, "Slug is too short!")
    .regex(/^[a-z0-9-]+$/, "Invalid slug format"),
  shortDescription: z
    .string()
    .min(10, "Short description is too short!")
    .max(255),
  longDescription: z
    .string()
    .min(20, "Long description must provide substantial specifications"),
  price: z.number().positive("Price must be greater than 0"),
  category: z.enum(["MEN", "WOMEN"]),
});

export type ActionState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  data?: any;
} | null;

/**
 * Handles multipart form-data uploads securely from server context to the node backend
 */
export async function createProductAction(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  // 1. Convert raw form entries into formatted types for internal schema checking
  const rawFields = {
    name: formData.get("name") as string,
    slug: formData.get("slug") as string,
    shortDescription: formData.get("shortDescription") as string,
    longDescription: formData.get("longDescription") as string,
    price: Number(formData.get("price")),
    category: formData.get("category") as "MEN" | "WOMEN",
  };

  const validatedFields = createProductFormSchema.safeParse(rawFields);
  if (!validatedFields.success) {
    return {
      success: false,
      message: "Form entry validation failed.",
      errors: validatedFields.error.flatten().fieldErrors as Record<
        string,
        string[]
      >,
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
      message: "At least one product image path is required",
      errors: {
        files: ["Please select at least one image file asset to upload."],
      },
    };
  }

  try {
    // 3. Acquire administrative session cookies
    const cookieStore = await cookies();
    const adminToken = cookieStore.get("accessToken")?.value || "";

    // 4. Construct a compliant outbound Multipart payload mirroring your backend constraints
    const backendPayload = new FormData();

    // Convert text properties to a text field string matching: JSON.parse(req.body.data)
    backendPayload.append("data", JSON.stringify(validatedFields.data));

    // Append binary objects into the multi-file pool matching: multerUpload.array("files")
    activeFiles.forEach((file) => {
      backendPayload.append("files", file);
    });

    // 5. Send payload to your core Express controller route [cite: 26, 36]
    const response = await axios.post(
      "http://localhost:5000/api/v1/products",
      backendPayload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${adminToken}`,
          Cookie: `accessToken=${adminToken}`,
        },
        withCredentials: true,
      },
    );

    return {
      success: true,
      message: response.data?.message || "Product Created Successfully",
      data: response.data?.data,
    };
  } catch (error: any) {
    console.error("Product creation transaction error exception:", error);
    const backendMessage =
      error.response?.data?.message ||
      "Failed to catalog new store product entry.";
    return {
      success: false,
      message: backendMessage,
    };
  }
}

export async function getAllProducts() {
  try {
    // Open public API endpoint (No token needed)
    const response = await axios.get("http://localhost:5000/api/v1/products");

    if (response.data?.success) {
      return {
        success: true,
        data: response.data.data,
      };
    }
    return { success: false, data: [] };
  } catch (error: any) {
    console.error("Error fetching public products:", error);
    return { success: false, data: [] };
  }
}
