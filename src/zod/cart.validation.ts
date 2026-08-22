import { z } from "zod";

export const addToCartZodSchema = z.object({
  productId: z.string({ error: "Product ID is required" }),
});
export const incrementDecrementZodSchema = z.object({
  productId: z.string({
    error: "Product ID is required for increment and decrement the quantity",
  }),
});

// export const updateCartItemZodSchema = z.object({
//   productId: z.string({ error: "Product ID is required" }),
//   // Allowing 0 here so the backend knows to delete the item
//   quantity: z.number().int().min(1, "Quantity must be at least One"),
// });

export const CartValidation = {
  addToCartZodSchema,
  incrementDecrementZodSchema,
  // updateCartItemZodSchema,
};
