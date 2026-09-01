import InfoRow from "@/components/shared/InfoRow";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/formatters";
import { IOrder } from "@/types/order.types";
import {
    Calendar,
    CreditCard,
    Mail,
    MapPin,
    Package,
    Phone,
    ReceiptText,
    ShoppingBag,
} from "lucide-react";
import Image from "next/image";

interface IOrderViewDetailDialogProps {
  open: boolean;
  onClose: () => void;
  order: IOrder | null;
}

export default function OrderViewDetailDialog({
  open,
  onClose,
  order,
}: IOrderViewDetailDialogProps) {
  if (!order) {
    return null;
  }
  const subtotal =
    order.orderItems?.reduce(
      (sum, item) => sum + Number(item.price) * item.quantity,
      0,
    ) ?? 0;

  const deliveryFee = Number(order.deliveryFee);
  const totalAmount = Number(order.totalAmount);

  const showExpiration =
    order.status === "PENDING" &&
    order.paymentMethod === "ONLINE" &&
    Boolean(order.expiresAt);
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full sm:max-w-4xl max-h-[90vh] flex flex-col p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <DialogTitle className="text-xl">Order Details</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {/* Header Banner */}
          <div className="flex flex-col sm:flex-row items-start justify-between gap-4 p-6 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 rounded-xl border">
            <div className="space-y-2 flex-1">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                {order.customerName || "N/A"}
              </h2>

              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <Mail className="h-4 w-4" />
                {order.email || "N/A"}
              </p>

              <p className="text-xs text-muted-foreground break-all">
                Order ID: {order.id}
              </p>
            </div>
          </div>

          {/* Payment Expiration */}
          {showExpiration && (
            <div className="rounded-lg border bg-muted/40 p-4">
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />

                <div>
                  <p className="text-sm font-medium">Online Payment Pending</p>

                  <p className="text-xs text-muted-foreground">
                    Expires at {formatDate(order.expiresAt as string)}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Customer & Delivery */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <ShoppingBag className="h-5 w-5" />
              <h3 className="font-semibold text-lg">Customer & Delivery</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-muted/40 p-4 rounded-lg border">
              <div className="flex items-start gap-3">
                <Phone className="h-4 w-4 mt-1 text-muted-foreground" />
                <InfoRow label="Phone" value={order.phone || "N/A"} />
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-4 w-4 mt-1 text-muted-foreground" />
                <InfoRow label="Alt Phone" value={order.altPhone || "N/A"} />
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                <InfoRow label="City" value={order.city || "N/A"} />
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                <InfoRow label="Thana" value={order.thana || "N/A"} />
              </div>
            </div>
          </div>

          <Separator />

          {/* Address & Order Audit */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Address */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="h-5 w-5" />
                <h3 className="font-semibold text-lg">Full Address</h3>
              </div>

              <div className="bg-muted/40 p-4 rounded-lg border text-sm leading-relaxed whitespace-pre-line text-foreground/90 min-h-[100px]">
                {order.address || "No detailed address provided."}
              </div>
            </div>

            {/* Order Audit */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="h-5 w-5" />
                <h3 className="font-semibold text-lg">Order Audit</h3>
              </div>

              <div className="bg-muted/40 p-4 rounded-lg border min-h-[100px] flex flex-col justify-center gap-4">
                <div className="flex items-start gap-3">
                  <Calendar className="h-4 w-4 mt-1 text-muted-foreground" />

                  <InfoRow
                    label="Placed At"
                    value={formatDate(order.createdAt)}
                  />
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Order Items */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Package className="h-5 w-5" />
              <h3 className="font-semibold text-lg">Order Items</h3>

              <Badge variant="secondary">{order.orderItems?.length ?? 0}</Badge>
            </div>

            <div className="rounded-lg border overflow-hidden">
              <div className="hidden md:grid grid-cols-[minmax(0,1fr)_100px_70px_100px] gap-4 px-4 py-3 bg-muted/40 border-b text-xs font-medium text-muted-foreground">
                <span>Product</span>
                <span>Price</span>
                <span>Qty</span>
                <span className="text-right">Total</span>
              </div>

              <div className="divide-y">
                {order.orderItems?.map((item) => {
                  const unitPrice = Number(item.price);
                  const lineTotal = unitPrice * item.quantity;
                  const image = item.product?.images?.[0];

                  return (
                    <div
                      key={item.id}
                      className="p-4 grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_100px_70px_100px] gap-4 md:items-center"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="h-14 w-14 rounded-md border bg-muted overflow-hidden shrink-0">
                          {image ? (
                            <Image
                              src={image}
                              width={200}
                              height={200}
                              alt={item.product?.name || "Product"}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center">
                              <Package className="h-5 w-5 text-muted-foreground" />
                            </div>
                          )}
                        </div>

                        <div className="min-w-0">
                          <p className="font-medium line-clamp-2">
                            {item.product?.name || "Unknown Product"}
                          </p>

                          <p className="text-xs text-muted-foreground">
                            {item.product?.category || ""}
                          </p>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs text-muted-foreground md:hidden">
                          Price
                        </p>
                        <p className="font-medium">৳{unitPrice.toFixed(2)}</p>
                      </div>

                      <div>
                        <p className="text-xs text-muted-foreground md:hidden">
                          Qty
                        </p>
                        <p className="font-medium">× {item.quantity}</p>
                      </div>

                      <div className="md:text-right">
                        <p className="text-xs text-muted-foreground md:hidden">
                          Total
                        </p>
                        <p className="font-semibold">৳{lineTotal.toFixed(2)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <Separator />

          {/* Financial & Payment */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="h-5 w-5" />
              <h3 className="font-semibold text-lg">Financial & Payment</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Payment */}
              <div className="bg-muted/40 p-4 rounded-lg border space-y-4">
                <div className="flex items-center gap-2">
                  <ReceiptText className="h-4 w-4 text-muted-foreground" />
                  <p className="font-medium">Payment Details</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <InfoRow
                    label="Method"
                    value={order.paymentMethod || "N/A"}
                  />

                  <InfoRow
                    label="Status"
                    value={order.paymentStatus || "N/A"}
                  />
                </div>

                {order.transactionId && (
                  <>
                    <Separator />

                    <InfoRow
                      label="Transaction ID"
                      value={order.transactionId}
                    />
                  </>
                )}
              </div>

              {/* Summary */}
              <div className="bg-muted/40 p-4 rounded-lg border">
                <p className="font-medium mb-4">Order Summary</p>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>

                    <span className="font-medium">৳{subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Delivery Fee</span>

                    <span className="font-medium">
                      ৳{deliveryFee.toFixed(2)}
                    </span>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Grand Total</span>

                    <span className="text-xl font-bold">
                      ৳{totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
