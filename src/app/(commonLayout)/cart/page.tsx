import CartContainer from "@/components/modules/cart/CartContainer";
import RefreshButton from "@/components/shared/RefreshButton";
import { getCarts } from "@/services/cart/cartManagement";

export const dynamic = "force-dynamic";

export default async function CartPage() {
  const cartsResult = await getCarts();
  console.log(cartsResult, "from cart page");

  return (
    <div className="space-y-6">
      <div className="flex space-x-2">
        <RefreshButton />
      </div>
      <CartContainer data={cartsResult.data} />
    </div>
  );
}
