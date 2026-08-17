import z from "zod";

export const createProductZodSchema = z.object({
  name: z
    .string()
    .min(1, "Product name is required!")
    .min(3, "Product name is too short!")
    .max(100, "Product name is too long"),

  // images: z
  //   .any()
  //   .refine(
  //     (value) =>
  //       typeof window !== "undefined" &&
  //       value instanceof FileList &&
  //       value.length > 0,
  //     { message: "At least one product image asset is required." },
  //   ),

  shortDescription: z
    .string({
      error: "Short description is required",
    })
    .trim()
    .min(10, "Short description is too short!")
    .max(255, "Short description is too long!"),

  longDescription: z
    .string({
      error: "Long description text block is required",
    })
    .trim()
    .min(20, "Description must be at least 20 characters long."),

  price: z
    .number({
      error: "Product price is required",
    })
    .positive("Price must be a positive currency amount greater than 0"),

  category: z.enum(["MEN", "WOMEN"], {
    error:
      "Target fragrance classification category is required (MEN or WOMEN)",
  }),
});

// Future Proofing: Update schema where all properties are optional
export const updateProductZodSchema = z.object({
  name: z
    .string()
    .min(3, "Product name is too short!")
    .max(100, "Product name is too long")
    .optional(),

  slug: z
    .string()
    .min(5, "Slug is too short!")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug must be URL-safe (lowercase letters, numbers, and hyphens only)",
    )
    .optional(),

  shortDescription: z
    .string()
    .min(10, "Short description is too short!")
    .max(255, "Short description is too long!")
    .optional(),

  longDescription: z
    .string()
    .min(20, "Long description must provide substantial item specifications")
    .optional(),

  price: z
    .number()
    .positive("Price must be a positive currency amount greater than 0")
    .optional(),

  category: z
    .enum(["MEN", "WOMEN"], {
      error: "Category must be either MEN or WOMEN",
    })
    .optional(),

  // These handle your image adding/removing logic
  deleteImages: z.array(z.url({ message: "Must be a valid URL" })).optional(),

  newImages: z.array(z.url()).optional(),
});

export const deleteProductsZodSchema = z.object({
  ids: z
    .array(z.string())
    .min(1, "At least one product ID is required for deletion."),
});
