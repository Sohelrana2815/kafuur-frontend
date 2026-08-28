import InfoRow from "@/components/shared/InfoRow";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/formatters";
import { IUser } from "@/types/user.interface";
import {
  Calendar,
  DollarSign,
  FileText,
  ImageIcon,
  Link,
  Package,
  Tag,
} from "lucide-react";
import Image from "next/image";

interface IUserViewDialogProps {
  open: boolean;
  onClose: () => void;
  user: IUser | null;
}

export default function UserViewDetailDialog({
  open,
  onClose,
  user,
}: IUserViewDialogProps) {
  if (!user) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full sm:max-w-7xl max-h-[90vh] flex flex-col p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <DialogTitle className="text-xl">Product Details</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {/* Header Banner */}
          <div className="flex flex-col sm:flex-row items-start justify-between gap-4 p-6 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 rounded-xl border">
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant={product?.isDeleted ? "destructive" : "default"}>
                  {product?.isDeleted ? "Archived" : "Active"}
                </Badge>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                {product?.name || "Untitled Product"}
              </h2>
              <p className="text-sm text-muted-foreground">
                {product?.shortDescription}
              </p>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-xs text-muted-foreground block mb-1">
                Price
              </span>
              <span className="text-3xl font-extrabold text-primary">
                ${Number(product?.price || 0).toFixed(2)}
              </span>
            </div>
          </div>

          {/* Image Gallery - Optimized for 7xl layout */}
          {product?.images && product.images.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <ImageIcon className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold text-lg">Product Media</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
                {product.images.map((src, index) => (
                  <div
                    key={index}
                    className="relative aspect-square rounded-lg overflow-hidden border bg-muted"
                  >
                    <Image
                      src={src}
                      alt={`${product.name} image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <Separator />

          {/* Core Metadata - Expanded to 4 columns for wider dialog */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Package className="h-5 w-5 text-indigo-600" />
              <h3 className="font-semibold text-lg">Specifications</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-muted/40 p-4 rounded-lg border">
              <div className="flex items-start gap-3">
                <Tag className="h-4 w-4 mt-1 text-muted-foreground" />
                <InfoRow label="Category" value={product?.category || "N/A"} />
              </div>
              <div className="flex items-start gap-3">
                <DollarSign className="h-4 w-4 mt-1 text-muted-foreground" />
                <InfoRow
                  label="Price"
                  value={`$${Number(product?.price || 0).toFixed(2)}`}
                />
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="h-4 w-4 mt-1 text-muted-foreground" />
                <InfoRow
                  label="Added Since"
                  value={formatDate(product?.createdAt)}
                />
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="h-4 w-4 mt-1 text-muted-foreground" />
                <InfoRow
                  label="Modified Date"
                  value={formatDate(product?.updatedAt)}
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Slug Unique */}
          <div className="flex items-start gap-3">
            <Link className="h-4 w-4 mt-1 text-muted-foreground" />
            <InfoRow
              label="Product Slug"
              value={`kafuur/products/${product?.slug}` || "N/A"}
            />
          </div>
          {/* Long Description */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FileText className="h-5 w-5 text-emerald-600" />
              <h3 className="font-semibold text-lg">Full Description</h3>
            </div>
            <div className="bg-muted/40 p-4 rounded-lg border text-sm leading-relaxed whitespace-pre-line text-foreground/90">
              {product?.longDescription || "No detailed description provided."}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
