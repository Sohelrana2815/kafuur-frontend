// @/lib/action-utils.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";

export type ActionState<T> = {
  success: boolean;
  message: string;
  // Allow undefined to satisfy TypeScript's strict type checking
  errors?: Record<string, string[] | undefined>;
  data?: T;
} | null;


export function validatedAction<TSchema extends z.ZodTypeAny, TResult>(
  schema: TSchema,
  handler: (validatedData: z.infer<TSchema>) => Promise<ActionState<TResult>>
) {
  return async (
    prevState: ActionState<TResult>,
    payload: z.infer<TSchema>
  ): Promise<ActionState<TResult>> => {
    // 1. Perform Validation
    const validationResult = schema.safeParse(payload);

    if (!validationResult.success) {
      return {
        success: false,
        message: "Please ensure your credentials follow standard validation guidelines.",
        // Use Zod's new standalone flattenError function
        errors: z.flattenError(validationResult.error).fieldErrors,
      };
    }

    // 2. Execute the actual action handler safely
    try {
      return await handler(validationResult.data);
    } catch (error: any) {
      console.error("Server Action Error:", error);
      return {
        success: false,
        message: "An unexpected network or server error occurred.",
      };
    }
  };
}