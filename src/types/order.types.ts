export interface IOrderSummary {
  itemCount: number;
  subtotal: number;
  shippingFee: number;
  total: number;
}

export const emptySummary: IOrderSummary = {
  itemCount: 0,
  subtotal: 0,
  shippingFee: 0,
  total: 0,
};



export interface ICreateOrderPayload {
  cartItemIds: string[];
  paymentMethod: "ONLINE" | "COD";
}
