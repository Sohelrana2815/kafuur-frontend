"use client";

import GoogleAuthButton from "@/components/shared/auth/GoogleAuthButton";
import { loading } from "@/components/ui/authLoading";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { registerAction } from "@/services/user/user.service";
import Link from "next/link";
import { useActionState, useEffect } from "react";
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
      {/* Other Auths */}
      <div className="pt-4">
        <p className="text-center">
          Already have an account?{" "}
          <Link href="/login">
            <span className="text-primary hover:underline cursor-pointer">
              Sign in
            </span>
          </Link>
        </p>
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 flex-shrink text-foreground">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <GoogleAuthButton />
      </div>
    </div>
  );
}
