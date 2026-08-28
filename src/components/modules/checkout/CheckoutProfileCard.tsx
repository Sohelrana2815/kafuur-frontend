import { IUserProfile } from "@/types/user.interface";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

interface ICartContainerProps {
  profileData: Partial<IUserProfile>;
}
export default function CheckoutProfileCard({
  profileData,
}: ICartContainerProps) {
  const requiredFields = [
    profileData.name,
    profileData.email,
    profileData.phone,
    profileData.address,
    profileData.city,
    profileData.thana,
  ];

  const hasMissingInfo = requiredFields.some(
    (value) => !value || value.trim() === "",
  );

  const fullAddress = [profileData.address, profileData.thana, profileData.city]
    .filter(Boolean)
    .join(", ");

  return (
    <section className="overflow-hidden rounded-xl border border-border bg-card text-card-foreground">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <h2 className="text-base font-semibold">Shipping & Billing</h2>

        <Link
          href="/my-profile"
          className="text-sm font-medium text-primary transition-opacity hover:opacity-80"
        >
          Edit
        </Link>
      </div>

      {/* Customer Information */}
      <div className="px-5 py-4">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-sm">
          <span className="font-medium">
            {profileData.name || "Name not provided"}
          </span>

          {profileData.phone ? (
            <span className="text-muted-foreground">{profileData.phone}</span>
          ) : (
            <span className="text-destructive">Phone not provided</span>
          )}
        </div>

        {/* Email */}
        {profileData.email && (
          <p className="mt-1 text-sm text-muted-foreground">
            {profileData.email}
          </p>
        )}

        {/* Address */}
        {fullAddress ? (
          <p className="mt-2 text-sm leading-relaxed">{fullAddress}</p>
        ) : (
          <p className="mt-2 text-sm text-destructive">
            Delivery address not provided
          </p>
        )}

        {/* Missing Information Warning */}
        {hasMissingInfo && (
          <div className="mt-4 flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-3">
            <AlertCircle
              size={18}
              className="mt-0.5 shrink-0 text-destructive"
            />

            <div>
              <p className="text-sm font-medium text-destructive">
                Delivery information is incomplete
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                Please update your profile before placing this order.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
