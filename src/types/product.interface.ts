export enum UsageOccasion {
  DAILY = "DAILY",
  OFFICE = "OFFICE",
  PARTY = "PARTY",
  DATE = "DATE",
  OUTDOOR = "OUTDOOR",
}
export enum ScentProfile {
  FRESH = "FRESH",
  SWEET = "SWEET",
  WOODY = "WOODY",
  SPICY = "SPICY",
}

export enum ScentStrength {
  MILD = "MILD",
  MEDIUM = "MEDIUM",
  STRONG = "STRONG",
}

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
  usages: UsageOccasion[];
  scentProfiles: ScentProfile[];
  strength: ScentStrength;
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
