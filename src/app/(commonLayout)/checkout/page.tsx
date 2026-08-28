import CheckoutContainer from "@/components/modules/checkout/CheckoutContainer";
import CheckoutProfileCard from "@/components/modules/checkout/CheckoutProfileCard";
import OrderSummary from "@/components/shared/OrderSummary";
import { getMyProfile } from "@/services/auth/auth.service";
import { getCarts } from "@/services/cart/cartManagement";
import { getOrderSummary } from "@/services/order/orderManagement";
import { emptySummary } from "@/types/order.types";
import { redirect } from "next/navigation";

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ ids?: string }>;
}) {
  const { ids } = await searchParams;

  const cartItemIds = ids ? ids.split(",").filter(Boolean) : [];
  // 1. Redirect if no items are selected to prevent crashes
  if (cartItemIds.length === 0) {
    redirect("/cart");
  }
  const profileResult = await getMyProfile();
  const [cartsResult, summaryResult] = await Promise.all([
    getCarts(cartItemIds),
    getOrderSummary(cartItemIds),
  ]);
  // 2. Provide safe fallbacks so the UI doesn't break if API fails
  const cartItems = cartsResult?.data || [];
  const summaryData = summaryResult?.data || emptySummary;
  return (
    <div className="space-y-6">
      <CheckoutProfileCard profileData={profileResult?.data} />

      <CheckoutContainer data={cartItems} />

      <OrderSummary
        summary={summaryData}
        actionLabel="Proceed to Pay"
        actionHref={`/checkout/payment?ids=${ids}`}
      />
    </div>
  );
}
