/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useActionState, useEffect, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createOrderAction } from "@/actions/order";
import { ShoppingBag } from "lucide-react";

const checkoutFormSchema = z.object({
  customerName: z.string().min(2, "Name is required"),
  phone: z.string().min(11, "Valid phone number is required"),
  altPhone: z.string().optional(),
  email: z.email("Invalid email address").optional().or(z.literal("")),
  address: z.string().min(5, "Full street address is required"),
  city: z.string().min(2, "City is required"),
  thana: z.string().min(2, "Thana/Area is required"),
  paymentMethod: z.enum(["COD", "ONLINE"]),
});

export default function CheckoutForm() {
  const router = useRouter();
  const { cartItems, cartTotal, clearCart } = useCart();
  const [state, formAction, isPending] = useActionState(
    createOrderAction,
    null,
  );
  const [, startTransition] = useTransition();

  const form = useForm<z.infer<typeof checkoutFormSchema>>({
    defaultValues: {
      customerName: "",
      phone: "",
      altPhone: "",
      email: "",
      address: "",
      city: "",
      thana: "",
      paymentMethod: "COD",
    },
    resolver: zodResolver(checkoutFormSchema),
    mode: "onTouched",
  });
  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message);

      // FIX: Only clear the cart if there are items in it.
      // Once cleared, this component re-renders, but this block won't run clearCart again!
      if (cartItems.length > 0) {
        clearCart();
      }

      form.reset();
      router.push("/products");
    } else {
      toast.error(state.message);
      if (state.errors) {
        Object.entries(state.errors).forEach(([field, messages]) => {
          form.setError(field as any, { type: "server", message: messages[0] });
        });
      }
    }
    // Add cartItems to the dependency array so the effect re-evaluates safely
  }, [state, form, clearCart, router, cartItems]);

  const onSubmit = (data: z.infer<typeof checkoutFormSchema>) => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    // Map cart items exactly to the backend array structure expectation [cite: 152, 156]
    const orderItems = cartItems.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
    }));

    // Combine form data and cart data into one payload
    const payload = {
      ...data,
      items: orderItems,
    };

    startTransition(() => {
      formAction(payload);
    });
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <ShoppingBag className="w-12 h-12 text-neutral-600 mb-4" />
        <h2 className="text-xl font-bold text-white mb-2">Cart is empty</h2>
        <p className="text-neutral-400 mb-6">
          Add items to your cart before checking out.
        </p>
        <Button onClick={() => router.push("/products")}>Return to Shop</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-12">
      {/* LEFT: Checkout Form */}
      <div className="flex-1">
        <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-wider">
          Shipping Details
        </h2>

        <form
          id="checkout-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <FieldGroup>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Controller
                control={form.control}
                name="customerName"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Full Name *</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      placeholder="John Doe"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                control={form.control}
                name="email"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      Email Address (Optional)
                    </FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      type="email"
                      placeholder="john@example.com"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Controller
                control={form.control}
                name="phone"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Phone Number *</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      placeholder="01700000000"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                control={form.control}
                name="altPhone"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      Alternative Phone
                    </FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      placeholder="Optional"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            <Controller
              control={form.control}
              name="address"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Detailed Address *
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    placeholder="House 12, Road 4, Block C"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Controller
                control={form.control}
                name="city"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>City *</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      placeholder="Dhaka"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                control={form.control}
                name="thana"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Thana/Area *</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      placeholder="Banani"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            <Controller
              control={form.control}
              name="paymentMethod"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Payment Method *</FieldLabel>
                  <div className="flex items-center gap-6 mt-2">
                    <label className="flex items-center gap-2 text-sm font-medium cursor-pointer text-neutral-300">
                      <input
                        type="radio"
                        value="COD"
                        checked={field.value === "COD"}
                        onChange={() => field.onChange("COD")}
                        className="w-4 h-4 accent-[#ff5294]"
                      />
                      Cash on Delivery
                    </label>
                    <label className="flex items-center gap-2 text-sm font-medium cursor-pointer text-neutral-300">
                      <input
                        type="radio"
                        value="ONLINE"
                        checked={field.value === "ONLINE"}
                        onChange={() => field.onChange("ONLINE")}
                        className="w-4 h-4 accent-[#ff5294]"
                      />
                      Online Payment
                    </label>
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </div>

      {/* RIGHT: Order Summary */}
      <div className="w-full lg:w-[400px] shrink-0">
        <div className="bg-[#121214] border border-white/10 rounded-2xl p-6 md:p-8 sticky top-28">
          <h2 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">
            Order Summary
          </h2>

          <div className="flex flex-col gap-4 mb-6 pb-6 border-b border-white/10 max-h-60 overflow-y-auto scrollbar-hide">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-black rounded flex items-center justify-center border border-white/5 overflow-hidden">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ShoppingBag className="w-4 h-4 text-neutral-600" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white line-clamp-1">
                      {item.name}
                    </p>
                    <p className="text-xs text-neutral-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>
                <p className="text-sm font-medium text-white">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3 text-sm mb-6 pb-6 border-b border-white/10">
            <div className="flex justify-between text-neutral-400">
              <span>Subtotal</span>
              <span className="text-white">${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-neutral-400">
              <span>Delivery Fee</span>
              <span className="text-white">$60.00</span>{" "}
              {/* Hardcoded default based on schema [cite: 157, 169] */}
            </div>
          </div>

          <div className="flex justify-between items-center mb-8">
            <span className="text-base font-medium text-white">Total</span>
            <span className="text-2xl font-bold text-[#ff5294]">
              ${(cartTotal + 60).toFixed(2)}
            </span>
          </div>

          {/* Trigger the form submission using the form ID */}
          <Button
            form="checkout-form"
            type="submit"
            className="w-full bg-[#ff5294] hover:bg-[#e6407d] text-white py-6 rounded-full font-bold uppercase tracking-widest"
            disabled={isPending}
          >
            {isPending ? "Processing Order..." : "Place Order"}
          </Button>
        </div>
      </div>
    </div>
  );
}
