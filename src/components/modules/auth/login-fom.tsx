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
import { loginAction } from "@/services/auth/auth.service";
import { loading } from "@/components/ui/authLoading";
import { toast } from "sonner";



export default function LoginForm({ redirect }: { redirect?: string }) {
  const [state, formAction, isPending] = useActionState(loginAction, null);
   console.log("State: ", state);

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
  console.log("STATE:", state);

  if (state && !state.success && state.message) {
    console.log("CALLING TOAST:", state.message);
    toast.error(state.message);
  }
}, [state]);
  return (
    <div className="w-full">
      <form action={formAction}>
         {redirect && <input type="hidden" name="redirect" value={redirect} />}
         
        <FieldGroup>
          <div className="grid grid-cols-1 gap-4">
            {/* Email */}
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                name="email"
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
                {isPending ? loading : "Login"}
              </Button>
            </Field>
          </FieldGroup>
        </FieldGroup>
      </form>
    </div>
  );
}
