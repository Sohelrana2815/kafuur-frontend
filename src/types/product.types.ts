export type ProductCategory = "MEN" | "WOMEN";
export interface IBackendProduct {
  id?: string;
  name: string;
  slug?: string;
  images?: string[]; // Cloudinary secure image URLs array
  shortDescription: string;
  longDescription: string;
  price: number;
  category: ProductCategory;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
export interface IProductDetails {
  id: string;
  name: string;
  slug: string;
  images: string[]; // Cloudinary secure image URLs array
  shortDescription: string;
  longDescription: string;
  price: number;
  category: ProductCategory;
}
export interface IUpdateProductPayload {
  name?: string;
  slug?: string;
  shortDescription?: string;
  longDescription?: string;
  price?: number;
  category?: ProductCategory;

  deleteImages?: string[];
  newImages?: string[];
}
