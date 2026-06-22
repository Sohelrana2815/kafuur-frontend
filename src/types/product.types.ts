export interface BackendProduct {
  id: string;
  name: string;
  slug: string;
  images: string[]; // Cloudinary secure image URLs array
  shortDescription: string;
  longDescription: string;
  price: number;
  category: "MEN" | "WOMEN";
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}