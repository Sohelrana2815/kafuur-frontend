"use client";

import { Controller, useForm } from "react-hook-form";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import { registerAction } from "@/services/user/user.service";
// Loading Spinner Tailwind CSS

const loading = (
  <div className="flex items-center justify-center">
    <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
  </div>
);

export default function RegisterForm() {
  const [state, formAction, isPending] = useActionState(registerAction, null);
  console.log("State: ", state, "Pending Status:", isPending);
  return (
    <div className="w-full">
      <form action={formAction}>
        <FieldGroup>
          <div className="grid grid-cols-1 gap-4">
            {/* Name */}
            <Field>
              <FieldLabel htmlFor="email">Name</FieldLabel>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Name"
                //   required
              />
            </Field>
            {/* Email */}
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                //   required
              />
            </Field>

            {/* Password */}
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                //   required
              />
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
