"use client";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useActionState, useEffect } from "react";
import { registerAction } from "@/services/user/user.service";
import { loading } from "@/components/ui/authLoading";
import { toast } from "sonner";

export default function RegisterForm() {
  const [state, formAction, isPending] = useActionState(registerAction, null);
  console.log("State: ", state, "Pending Status:", isPending);
  const getFieldError = (fieldName: string) => {
    if (state && state.errors) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const error = state.errors.find((err: any) => err.field === fieldName);
      return error?.message;
    } else {
      return null;
    }
  };

  useEffect(() => {

  if (state && !state.success && state.message) {
    toast.error(state.message);
  }
}, [state]);
  return (
    <div className="w-full">
      <form action={formAction}>
        <FieldGroup>
          <div className="grid grid-cols-1 gap-4">
            {/* Name */}
            <Field>
              <FieldLabel htmlFor="email">Name</FieldLabel>
              <Input id="name" name="name" type="text" placeholder="Name" />
              {getFieldError("name") && (
                <FieldDescription className="text-red-600">
                  {getFieldError("name")}
                </FieldDescription>
              )}
            </Field>
            {/* Email */}
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
              />
              {getFieldError("email") && (
                <FieldDescription className="text-red-600">
                  {getFieldError("email")}
                </FieldDescription>
              )}
            </Field>

            {/* Password */}
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
              />
              {getFieldError("password") && (
                <FieldDescription className="text-red-600">
                  {getFieldError("password")}
                </FieldDescription>
              )}
            </Field>
          </div>
          <FieldGroup className="mt-4">
            <Field>
              <Button type="submit" disabled={isPending}>
                {isPending ? loading : "Crete Account"}
              </Button>
            </Field>
          </FieldGroup>
        </FieldGroup>
      </form>
    </div>
  );
}
