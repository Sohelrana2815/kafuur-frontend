import PaymentContainer from "@/components/modules/payment/PaymentContainer";
import { getOrderSummary } from "@/services/order/orderManagement";
import { emptySummary } from "@/types/order.types";
import { redirect } from "next/navigation";

export default async function PaymentPage({
  searchParams,
}: {
  searchParams: Promise<{ ids?: string }>;
}) {
  const { ids } = await searchParams;
  const cartItemIds = ids ? ids.split(",").filter(Boolean) : [];

  if (cartItemIds.length === 0) {
    redirect("/cart");
  }

  const summaryResult = await getOrderSummary(cartItemIds);
  const summaryData = summaryResult?.data || emptySummary;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Select Payment Method</h1>
      <PaymentContainer cartItemIds={cartItemIds} summary={summaryData} />
    </div>
  );
}
