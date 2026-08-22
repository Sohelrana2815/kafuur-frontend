export interface IAddToCartPayload {
  productId: string;
}
export interface IncrementCartItemPayload {
  productId: string;
}
export interface DecrementCartItemPayload {
  productId: string;
}

// export interface ICartItemPayload {
//   productId: string;
//   quantity: number;
// }



export interface ICartItem {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  product: {
    id: string;
    name: string;
    price: string; // Prisma Decimal serialized as string
    images: string[];
  };
}
