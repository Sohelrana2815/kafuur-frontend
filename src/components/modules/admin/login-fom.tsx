/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useActionState, useEffect, useTransition } from "react";
import { loginAdminAction } from "@/actions/admin";
import { loginAdminSchema } from "@/zod/admin/adminAuth.validation";

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAdminAction, null);
  const [, startTransition] = useTransition();

  const form = useForm<z.infer<typeof loginAdminSchema>>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginAdminSchema),
    mode: "onTouched",
  });

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message || "Authorized Successfully!");
      // Option: redirect to admin dashboard here using useRouter() if desired
    } else {
      toast.error(state.message || "Failed to log in.");

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

  const onSubmit = (data: z.infer<typeof loginAdminSchema>) => {
    startTransition(() => {
      formAction(data);
    });
  };

  return (
    <div className="w-full">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          {/* Email Input Field */}
          <Controller
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Email Address</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="email"
                  placeholder="admin@kafuur.com"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Password Input Field */}
          <Controller
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="password"
                  placeholder="••••••••"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Button type="submit" className="w-full mt-2" disabled={isPending}>
            {isPending ? "Verifying Credentials..." : "Access Dashboard"}
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
}
