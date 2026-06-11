/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { registerAdminSchema } from "@/zod/admin/adminAuth.validation"; // [cite: 255]
import { Controller, useForm } from "react-hook-form"; // [cite: 256]
import z from "zod"; // [cite: 256]
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"; // [cite: 256]
import { Input } from "@/components/ui/input"; // [cite: 257]
import { Button } from "@/components/ui/button"; // [cite: 257]
import { toast } from "sonner"; // [cite: 257]
import { useActionState, useEffect, useTransition } from "react"; // [cite: 258]
import { registerAdminAction } from "@/actions/admin";

export default function RegisterForm() {
  // Hook up Next.js server actions state management
  const [state, formAction, isPending] = useActionState(
    registerAdminAction,
    null,
  ); // [cite: 258]
  const [, startTransition] = useTransition();

  const form = useForm({
    // [cite: 259]
    defaultValues: {
      // [cite: 259]
      username: "", // [cite: 259]
      email: "", // [cite: 259]
      password: "", // [cite: 259]
    }, // [cite: 259]
    resolver: zodResolver(registerAdminSchema), // [cite: 259]
    mode: "onTouched",
  }); // [cite: 259]

  // Listen to Server Action states and handle success/error states
  useEffect(() => {
    if (!state) return;

    if (state.success) {
      form.reset(); // [cite: 260]
      toast.success(state.message); // [cite: 261]
    } else {
      toast.error(state.message || "Failed to create Admin"); // [cite: 262]

      // If the server returns distinct field errors, re-inject them into Hook Form
      if (state.errors) {
        Object.entries(state.errors).forEach(([field, messages]) => {
          form.setError(field as any, {
            type: "server",
            message: messages[0],
          });
        });
      }
    }
  }, [state, form]);

  const onSubmit = async (data: z.infer<typeof registerAdminSchema>) => {
    // [cite: 270]
    // Bridge Hook-Form with React Server Actions securely using transitions
    startTransition(() => {
      formAction(data);
    });
  }; // [cite: 261]

  return (
    // [cite: 262]
    <div className="container max-w-lg px-4 mx-auto my-6">
      {" "}
      {/* [cite: 262] */}
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {" "}
        {/* [cite: 262] */}
        <FieldGroup>
          {" "}
          {/* [cite: 262] */}
          {/* Username */}
          <Controller // [cite: 262]
            control={form.control} // [cite: 262]
            name="username" // [cite: 262]
            render={(
              { field, fieldState }, // [cite: 262]
            ) => (
              <Field data-invalid={fieldState.invalid}>
                {" "}
                {/* [cite: 262] */}
                <FieldLabel htmlFor={field.name}>Username</FieldLabel>{" "}
                {/* [cite: 262] */}
                <Input // [cite: 262]
                  {...field} // [cite: 262]
                  id={field.name} // [cite: 262]
                  aria-invalid={fieldState.invalid} // [cite: 262]
                />{" "}
                {/* [cite: 262] */}
                {fieldState.invalid && ( // [cite: 262]
                  <FieldError errors={[fieldState.error]} /> // [cite: 262]
                )}{" "}
                {/* [cite: 262] */}
              </Field>
            )} // [cite: 262]
          />
          {/* Email */}
          <Controller // [cite: 262]
            control={form.control} // [cite: 262]
            name="email" // [cite: 262]
            render={(
              { field, fieldState }, // [cite: 262]
            ) => (
              <Field data-invalid={fieldState.invalid}>
                {" "}
                {/* [cite: 262] */}
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>{" "}
                {/* [cite: 262] */}
                <Input // [cite: 262]
                  {...field} // [cite: 262]
                  id={field.name} // [cite: 262]
                  type="email"
                  aria-invalid={fieldState.invalid} // [cite: 262]
                />{" "}
                {/* [cite: 262] */}
                {fieldState.invalid && ( // [cite: 262]
                  <FieldError errors={[fieldState.error]} /> // [cite: 262]
                )}{" "}
                {/* [cite: 262] */}
              </Field>
            )} // [cite: 262]
          />{" "}
          {/* [cite: 262] */}
          {/* Password */}
          <Controller // [cite: 262]
            control={form.control} // [cite: 262]
            name="password" // [cite: 262]
            render={(
              { field, fieldState }, // [cite: 262]
            ) => (
              <Field data-invalid={fieldState.invalid}>
                {" "}
                {/* [cite: 262] */}
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>{" "}
                {/* [cite: 262] */}
                <Input // [cite: 262]
                  {...field} // [cite: 262]
                  id={field.name} // [cite: 262]
                  type="password"
                  aria-invalid={fieldState.invalid} // [cite: 262]
                />{" "}
                {/* [cite: 262] */}
                {fieldState.invalid && ( // [cite: 262]
                  <FieldError errors={[fieldState.error]} /> // [cite: 262]
                )}{" "}
                {/* [cite: 262] */}
              </Field>
            )} // [cite: 262]
          />{" "}
          {/* [cite: 262] */}
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending
              ? "Creating Administrative Account..."
              : "Create Admin Account"}
          </Button>
        </FieldGroup>{" "}
        {/* [cite: 262] */}
      </form>{" "}
      {/* [cite: 262] */}
    </div>
  ); // [cite: 262]
}
