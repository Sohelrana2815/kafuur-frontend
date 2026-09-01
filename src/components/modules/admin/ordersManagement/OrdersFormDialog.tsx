import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateOrderAdmin } from "@/services/order/orderManagement";
import { IOrder } from "@/types/order.types";
import {
  orderStatusOptions,
  paymentStatusOptions,
} from "@/utils/order-options";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

interface OrderFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  order: IOrder;
}

export default function OrdersFormDialog({
  open,
  onClose,
  onSuccess,
  order,
}: OrderFormDialogProps) {
  // Local state for Select components (matches your category implementation)
  const [status, setStatus] = useState<string>(order.status || "");
  const [paymentStatus, setPaymentStatus] = useState<string>(
    order.paymentStatus || "",
  );
  // Bind the order ID to the server action
  const [state, formAction, pending] = useActionState(
    updateOrderAdmin.bind(null, order.id!),
    null,
  );

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
    if (!state) return;

    if (state.success) {
      toast.success(state.message || "Order record updated successfully");

      onSuccess();
      onClose();
    } else if (state.message) {
      toast.error(state.message);
    }
  }, [state, onSuccess, onClose]);
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>
            Edit Order #{order.id?.slice(-6).toUpperCase()}
          </DialogTitle>
        </DialogHeader>

        <form action={formAction} className="flex flex-col flex-1 min-h-0">
          <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4">
            {/* Order Status */}
            <Field>
              <FieldLabel htmlFor="status">Order Status</FieldLabel>
              <Input id="status" name="status" type="hidden" value={status} />
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {orderStatusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {getFieldError("status") && (
                <FieldDescription className="text-red-600">
                  {getFieldError("status")}
                </FieldDescription>
              )}
            </Field>

            {/* Payment Status */}
            <Field>
              <FieldLabel htmlFor="paymentStatus">Payment Status</FieldLabel>
              <Input
                id="paymentStatus"
                name="paymentStatus"
                type="hidden"
                value={paymentStatus}
              />
              <Select value={paymentStatus} onValueChange={setPaymentStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select payment status" />
                </SelectTrigger>
                <SelectContent>
                  {paymentStatusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {getFieldError("paymentStatus") && (
                <FieldDescription className="text-red-600">
                  {getFieldError("paymentStatus")}
                </FieldDescription>
              )}
            </Field>

            {/* Customer Phone */}
            <Field>
              <FieldLabel htmlFor="phone">Customer Phone</FieldLabel>
              <Input
                id="phone"
                name="phone"
                placeholder="e.g., 017XXXXXXXX"
                defaultValue={order.phone}
              />
              {getFieldError("phone") && (
                <FieldDescription className="text-red-600">
                  {getFieldError("phone")}
                </FieldDescription>
              )}
            </Field>

            {/* Thana */}
            <Field>
              <FieldLabel htmlFor="thana">Thana / Area</FieldLabel>
              <Input
                id="thana"
                name="thana"
                placeholder="Area/Thana"
                defaultValue={order.thana}
              />
              {getFieldError("thana") && (
                <FieldDescription className="text-red-600">
                  {getFieldError("thana")}
                </FieldDescription>
              )}
            </Field>

            {/* Transaction ID */}
            <Field>
              <FieldLabel htmlFor="transactionId">Transaction ID</FieldLabel>
              <Input
                id="transactionId"
                name="transactionId"
                placeholder="e.g., TRX-12345678"
                defaultValue={order.transactionId || ""}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Leave blank if Cash on Delivery (COD).
              </p>
              {getFieldError("transactionId") && (
                <FieldDescription className="text-red-600">
                  {getFieldError("transactionId")}
                </FieldDescription>
              )}
            </Field>
          </div>

          <div className="flex justify-end gap-2 px-6 py-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={pending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={pending}>
              {pending ? "Updating..." : "Update Order"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
