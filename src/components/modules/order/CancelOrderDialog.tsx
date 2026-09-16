"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cancelMyOrder } from "@/services/order/myOrders";
import { IOrder } from "@/types/order.types";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

interface CancelOrderDialogProps {
  open: boolean;
  onClose: () => void;
  order: IOrder;
  onSuccess: () => void;
}

export default function CancelOrderDialog({
  open,
  onClose,
  order,
  onSuccess,
}: CancelOrderDialogProps) {
  const [state, formAction, pending] = useActionState(
    cancelMyOrder.bind(null, order.id!),
    null,
  );

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message);
      onSuccess();
      onClose();
    } else {
      toast.error(state.message);
    }
  }, [state, onSuccess, onClose]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Cancel Order #{order.id?.slice(-6).toUpperCase()}
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to cancel this order? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>

        <form action={formAction}>
          <DialogFooter className="mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={pending}
            >
              Keep Order
            </Button>
            <Button type="submit" variant="destructive" disabled={pending}>
              {pending ? "Cancelling..." : "Confirm"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
