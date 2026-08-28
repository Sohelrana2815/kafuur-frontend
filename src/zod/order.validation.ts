import { z } from "zod";

export const createOrderZodSchema = z.object({
  cartItemIds: z.array(z.string()).min(1, "At least one cart item is required"),

  paymentMethod: z.enum(["COD", "ONLINE"]).optional(),
});

export const OrderValidation = {
  createOrderZodSchema,
};
