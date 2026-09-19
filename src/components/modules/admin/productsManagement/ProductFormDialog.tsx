/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    createProduct,
    updateProduct,
} from "@/services/admin/productsManagement";
import { IBackendProduct } from "@/types/product.interface";
import { X } from "lucide-react";
import Image from "next/image";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

interface IProductFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  product?: IBackendProduct;
}

export default function ProductFormDialog({
  open,
  onClose,
  onSuccess,
  product,
}: IProductFormDialogProps) {
  const isEdit = !!product;
  const [category, setCategory] = useState<"MEN" | "WOMEN">(
    product?.category || "MEN",
  );

  // Existing images from Cloudinary
  const [existingImages, setExistingImages] = useState<string[]>(
    product?.images || [],
  );

  // Images that should be deleted from Cloudinary/backend
  const [deleteImages, setDeleteImages] = useState<string[]>([]);

  const [state, formAction, pending] = useActionState(
    isEdit ? updateProduct.bind(null, product.id!) : createProduct,
    null,
  );
  /**
   * Reset image state whenever the product changes.
   * This is important when opening the dialog for different products.
   */

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCategory(product?.category || "MEN");
    setExistingImages(product?.images || []);
    setDeleteImages([]);
  }, [product]);

  console.log("State from Product form:", state);
  // isEdit ? updateProduct.bind(null, product.id!) :

  const getFieldError = (fieldName: string) => {
    if (state && state.errors) {
      const error = state.errors.find((err: any) => err.field === fieldName);
      return error?.message;
    } else {
      return null;
    }
  };

  const handleDeleteExistingImage = (imageUrl: string) => {
    setExistingImages((prev) => prev.filter((image) => image !== imageUrl));

    setDeleteImages((prev) => [...prev, imageUrl]);
  };

  /**
   * If the user changes their mind before submitting,
   * restore the image back to the existing images list.
   */
  const handleRestoreExistingImage = (imageUrl: string) => {
    setDeleteImages((prev) => prev.filter((image) => image !== imageUrl));

    setExistingImages((prev) => [...prev, imageUrl]);
  };

  useEffect(() => {
    if (state && state?.success) {
      toast.success(state.message);
      onSuccess();
      onClose();
    } else if (state && !state.success && state.message) {
      toast.error(state.message);
    }
  }, [state, onSuccess, onClose]);
  console.log(deleteImages);
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>
            {isEdit ? "Edit Product" : "Add New Product"}
          </DialogTitle>
        </DialogHeader>

        <form action={formAction} className="flex flex-col flex-1 min-h-0">
          <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4">
            {/* Product Name */}
            <Field>
              <FieldLabel htmlFor="name">Product Name</FieldLabel>
              <Input
                id="name"
                name="name"
                placeholder="X Fragrance"
                defaultValue={isEdit ? product?.name : undefined}
              />
              {getFieldError("name") && (
                <FieldDescription className="text-red-600">
                  {getFieldError("name")}
                </FieldDescription>
              )}
            </Field>

            {/* Product Short Description */}

            <Field>
              <FieldLabel htmlFor="shortDescription">
                Short Description
              </FieldLabel>
              <Input
                id="shortDescription"
                name="shortDescription"
                placeholder="A brief description of the product"
                type="text"
                defaultValue={isEdit ? product?.shortDescription : undefined}
              />

              {getFieldError("shortDescription") && (
                <FieldDescription className="text-red-600">
                  {getFieldError("shortDescription")}
                </FieldDescription>
              )}
            </Field>
            {/* Product Long Description */}
            <Field>
              <FieldLabel htmlFor="longDescription">
                Long Description
              </FieldLabel>
              <Input
                id="longDescription"
                name="longDescription"
                placeholder="A detailed description of the product"
                defaultValue={isEdit ? product?.longDescription : undefined}
              />
              {getFieldError("longDescription") && (
                <FieldDescription className="text-red-600">
                  {getFieldError("longDescription")}
                </FieldDescription>
              )}
            </Field>
            {/* Product Price */}
            <Field>
              <FieldLabel htmlFor="price">Price</FieldLabel>
              <Input
                id="price"
                name="price"
                placeholder="0.00"
                type="number"
                defaultValue={isEdit ? product?.price : undefined}
              />
              {getFieldError("price") && (
                <FieldDescription className="text-red-600">
                  {getFieldError("price")}
                </FieldDescription>
              )}
            </Field>

            {/* Product Category */}
            <Field>
              <FieldLabel htmlFor="category">Category</FieldLabel>
              <Input
                id="category"
                name="category"
                placeholder="Select category"
                // defaultValue={isEdit ? product.category : undefined}
                type="hidden"
                value={category}
              />
              <Select
                value={category}
                // defaultValue={isEdit ? product.category : undefined}
                onValueChange={(value) => setCategory(value as "MEN" | "WOMEN")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MEN">Men</SelectItem>
                  <SelectItem value="WOMEN">Women</SelectItem>
                </SelectContent>
              </Select>
              {getFieldError("category") && (
                <FieldDescription className="text-red-600">
                  {getFieldError("category")}
                </FieldDescription>
              )}
            </Field>
            {/* Product Images */}
            {isEdit && existingImages.length > 0 && (
              // <Field>
              //   <FieldLabel htmlFor="files">Product Images</FieldLabel>
              //   <Input
              //     id="files"
              //     name="files"
              //     type="file"
              //     accept="image/*"
              //     multiple
              //     className="cursor-pointer"
              //   />
              //   <p className="text-xs text-foreground mt-1">
              //     Upload Images For Product.
              //   </p>
              //   {getFieldError("files") && (
              //     <FieldDescription className="text-red-600">
              //       {getFieldError("files")}
              //     </FieldDescription>
              //   )}
              // </Field>

              <Field>
                <FieldLabel>Existing Images</FieldLabel>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {existingImages.map((image) => (
                    <div
                      key={image}
                      className="relative group aspect-square overflow-hidden rounded-md border bg-muted"
                    >
                      <Image
                        src={image}
                        width={200}
                        height={200}
                        alt="Product"
                        className="w-full h-full object-cover"
                      />

                      <button
                        type="button"
                        onClick={() => handleDeleteExistingImage(image)}
                        disabled={pending}
                        className="absolute top-2 right-2 rounded-full bg-background/90 p-1.5 text-foreground shadow-sm opacity-0 group-hover:opacity-100 transition-opacity disabled:cursor-not-allowed"
                        aria-label="Delete image"
                      >
                        <X className="size-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </Field>
            )}
            {/* Images marked for deletion */}
            {isEdit && deleteImages.length > 0 && (
              <Field>
                <FieldLabel>Images to Delete</FieldLabel>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {deleteImages.map((image) => (
                    <div
                      key={image}
                      className="relative aspect-square overflow-hidden rounded-md border border-destructive/50 bg-muted"
                    >
                      <Image
                        src={image}
                        width={200}
                        height={200}
                        alt="Image marked for deletion"
                        className="w-full h-full object-cover opacity-50"
                      />

                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-medium bg-background/90 px-2 py-1 rounded">
                          Will be deleted
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRestoreExistingImage(image)}
                        disabled={pending}
                        className="absolute top-2 right-2 rounded-full bg-background/90 p-1.5 text-foreground shadow-sm"
                        aria-label="Restore image"
                      >
                        <X className="size-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </Field>
            )}
            {/* Product Images */}
            <Field>
              <FieldLabel htmlFor="files">
                {isEdit ? "Add New Images" : "Product Images"}
              </FieldLabel>

              <Input
                id="files"
                name="files"
                type="file"
                accept="image/*"
                multiple
                className="cursor-pointer"
              />

              <p className="text-xs text-foreground mt-1">
                {isEdit
                  ? "Select new images to add to this product."
                  : "Upload images for the product."}
              </p>

              {getFieldError("files") && (
                <FieldDescription className="text-red-600">
                  {getFieldError("files")}
                </FieldDescription>
              )}
            </Field>
            {/* Hidden deleteImages field */}
            {isEdit && deleteImages.length > 0 && (
              <input
                type="hidden"
                name="deleteImages"
                value={JSON.stringify(deleteImages)}
              />
            )}
          </div>

          <div className="flex justify-end gap-2 px-6 py-4 border-t ">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={pending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={pending}>
              {pending
                ? "Saving..."
                : isEdit
                  ? "Update Product"
                  : "Create Product"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
