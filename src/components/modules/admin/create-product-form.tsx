/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useActionState, useEffect, useTransition, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { toast } from "sonner";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createProductAction } from "@/actions/product";

// Client Schema ensuring structural parameters match expectations before submitting
const clientProductSchema = z.object({
  name: z
    .string()
    .min(3, "Product name is too short!")
    .max(100, "Product name is too long"),
  slug: z
    .string()
    .min(5, "Slug is too short!")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug must be URL-safe (lowercase letters, numbers, and hyphens only)",
    ),
  shortDescription: z
    .string()
    .min(10, "Short description is too short!")
    .max(255, "Short description is too long!"),
  longDescription: z
    .string()
    .min(20, "Long description must provide substantial item specifications"),
  price: z
    .number({ error: "Price must be a valid number" })
    .positive("Price must be a positive currency amount greater than 0"),
  category: z.enum(["MEN", "WOMEN"], {
    error:
      "Target fragrance classification category is required (MEN or WOMEN)",
  }),
});

export default function CreateProductForm() {
  const [state, formAction, isPending] = useActionState(
    createProductAction,
    null,
  );
  const [, startTransition] = useTransition();
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const form = useForm<z.infer<typeof clientProductSchema>>({
    defaultValues: {
      name: "",
      slug: "",
      shortDescription: "",
      longDescription: "",
      price: 0,
      category: "MEN",
    },
    resolver: zodResolver(clientProductSchema),
    mode: "onTouched",
  });

  // Handle server responses reactively
  useEffect(() => {
    if (!state) return;

    if (state.success) {
      form.reset();
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedFiles(null);
      // Manually reset the file input field layout
      const fileInput = document.getElementById(
        "files-input",
      ) as HTMLInputElement;
      if (fileInput) fileInput.value = "";

      toast.success(state.message || "Product Created Successfully");
    } else {
      toast.error(state.message || "Failed to create product");

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

  const onSubmit = (data: z.infer<typeof clientProductSchema>) => {
    if (!selectedFiles || selectedFiles.length === 0) {
      form.setError("root", {
        message: "At least one product image path is required",
      });
      toast.error("Please add at least one item image asset.");
      return;
    }

    // Build standard multi-part data stream matching expected backend schema structure
    const dynamicForm = new FormData();
    dynamicForm.append("name", data.name);
    dynamicForm.append("slug", data.slug);
    dynamicForm.append("shortDescription", data.shortDescription);
    dynamicForm.append("longDescription", data.longDescription);
    dynamicForm.append("price", String(data.price));
    dynamicForm.append("category", data.category);

    // Append binary items into the stream
    Array.from(selectedFiles).forEach((file) => {
      dynamicForm.append("files", file);
    });

    startTransition(() => {
      formAction(dynamicForm);
    });
  };

  return (
    <div className="w-full">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FieldGroup>
          {" "}
          {/* Product Title Name */}
          <Controller
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                {" "}
                <FieldLabel htmlFor={field.name}>Product Name</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  placeholder="E.g., Kafuur Absolute Oud"
                  aria-invalid={fieldState.invalid}
                />{" "}
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}{" "}
              </Field>
            )}
          />
          {/* URL Slug Input Field */}
          <Controller
            control={form.control}
            name="slug"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>URL Slug</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  placeholder="kafuur-absolute-oud"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          {/* Pricing Field */}
          <Controller
            control={form.control}
            name="price"
            render={({ field: { onChange, value, ...rest }, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="price">Price (USD / BDT)</FieldLabel>
                <Input
                  {...rest}
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={value || ""}
                  placeholder="1250.00"
                  onChange={(e) =>
                    onChange(
                      e.target.value === "" ? "" : Number(e.target.value),
                    )
                  }
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          {/* Category Radio Button Wrapper */}
          <Controller
            control={form.control}
            name="category"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Target Category Classification</FieldLabel>
                <div className="flex items-center gap-6 mt-2">
                  <label className="flex items-center gap-2 text-sm font-medium cursor-pointer text-neutral-700">
                    <input
                      type="radio"
                      name="category"
                      value="MEN"
                      checked={field.value === "MEN"}
                      onChange={() => field.onChange("MEN")}
                      className="w-4 h-4 text-neutral-900 border-neutral-300 focus:ring-neutral-900"
                    />
                    Men Fragrances
                  </label>
                  <label className="flex items-center gap-2 text-sm font-medium cursor-pointer text-neutral-700">
                    <input
                      type="radio"
                      name="category"
                      value="WOMEN"
                      checked={field.value === "WOMEN"}
                      onChange={() => field.onChange("WOMEN")}
                      className="w-4 h-4 text-neutral-900 border-neutral-300 focus:ring-neutral-900"
                    />
                    Women Fragrances
                  </label>
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          {/* File Upload Selector Field */}
          <Field>
            <FieldLabel htmlFor="files-input">
              Product Image Files Assets
            </FieldLabel>
            <Input
              id="files-input"
              type="file"
              multiple
              accept="image/*"
              className="cursor-pointer"
              onChange={(e) => setSelectedFiles(e.target.files)}
            />
            <p className="mt-1 text-xs text-neutral-400">
              You can hold down Ctrl/Cmd to select multiple files
              simultaneously.
            </p>
          </Field>
          {/* Short Description Textarea Field */}
          <Controller
            control={form.control}
            name="shortDescription"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Short Summary Hook</FieldLabel>
                <textarea
                  {...field}
                  id={field.name}
                  rows={3}
                  placeholder="Provide a quick 2-line summary for product feed lists..."
                  className="w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 disabled:cursor-not-allowed disabled:opacity-50"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          {/* Long Description Textarea Field */}
          <Controller
            control={form.control}
            name="longDescription"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  Comprehensive Product Specifications
                </FieldLabel>
                <textarea
                  {...field}
                  id={field.name}
                  rows={8}
                  placeholder="Elaborate on ingredients, base perfume notes, longevity metrics..."
                  className="w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 disabled:cursor-not-allowed disabled:opacity-50"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Button type="submit" className="w-full mt-4" disabled={isPending}>
            {isPending
              ? "Cataloging Product Record..."
              : "Register Product Entry"}
          </Button>
        </FieldGroup>{" "}
      </form>
    </div>
  );
}
