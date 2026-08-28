import { ICartItem } from "@/types/cart.types";
import CheckoutItemCard from "./CheckoutItemCard";

interface ICheckoutContainerProps {
  data: ICartItem[];
}

export default function CheckoutContainer({ data }: ICheckoutContainerProps) {
  return (
   <div className="space-y-4">
      {data.map((cart) => (
        <CheckoutItemCard
          key={cart.id}
          cart={cart}
        />
      ))}
    </div>
  );
}
