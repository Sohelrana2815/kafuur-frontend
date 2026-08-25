import { formatDate, getStatusBadge } from "@/lib/formatters";
import { IUserProfile } from "@/types/user.interface";
import {
  BadgeCheck,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  Home,
  Mail,
  MapPin,
  Phone,
  Shield,
  User,
  XCircle,
} from "lucide-react";
import Image from "next/image";

interface IMyProfileProps {
  profileData: IUserProfile;
}
export default function MyProfile({ profileData }: IMyProfileProps) {
  const {
    name,
    email,
    picture,
    role,
    status,
    isVerified,
    phone,
    altPhone,
    address,
    city,
    thana,
    createdAt,
    updatedAt,
  } = profileData;
//
  return (
    <div className="space-y-6">
      {/* Header Profile Overview Card */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-5">
            <div className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-border bg-muted">
              {picture ? (
                <Image
                  src={picture}
                  alt={name || "User Avatar"}
                  fill
                  className="object-cover"
                />
              ) : (
                <User className="h-10 w-10 text-muted-foreground" />
              )}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold tracking-tight text-foreground">
                  {name || "User Name"}
                </h2>
                {isVerified && (
                  <BadgeCheck
                    className="h-5 w-5 text-primary"
                    // title="Verified Account"
                  />
                )}
              </div>
              <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                {email}
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="inline-flex items-center rounded-md border border-border bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
                  {role}
                </span>
                <span
                  className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold ${getStatusBadge(
                    status,
                  )}`}
                >
                  {status}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground border-t border-border pt-4 md:border-t-0 md:pt-0">
            <Calendar className="h-4 w-4" />
            <span>Member since {formatDate(createdAt)}</span>
          </div>
        </div>
      </div>

      {/* Grid Content Sections */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Contact Information */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-semibold text-card-foreground flex items-center gap-2 border-b border-border pb-3">
            <User className="h-5 w-5 text-primary" />
            Personal Details
          </h3>
          <div className="space-y-4 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground flex items-center gap-2">
                <User className="h-4 w-4" /> Full Name
              </span>
              <span className="font-medium text-foreground">
                {name || "Not provided"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground flex items-center gap-2">
                <Mail className="h-4 w-4" /> Email
              </span>
              <span className="font-medium text-foreground">{email}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground flex items-center gap-2">
                <Phone className="h-4 w-4" /> Phone Number
              </span>
              <span className="font-medium text-foreground">
                {phone || "Not provided"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground flex items-center gap-2">
                <Phone className="h-4 w-4" /> Alt Phone Number
              </span>
              <span className="font-medium text-foreground">
                {altPhone || "Not provided"}
              </span>
            </div>
          </div>
        </div>

        {/* Location / Address */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-semibold text-card-foreground flex items-center gap-2 border-b border-border pb-3">
            <MapPin className="h-5 w-5 text-primary" />
            Address Information
          </h3>
          <div className="space-y-4 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground flex items-center gap-2">
                <Home className="h-4 w-4" /> Address
              </span>
              <span className="font-medium text-foreground text-right max-w-[200px] truncate">
                {address || "Not provided"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground flex items-center gap-2">
                <Building2 className="h-4 w-4" /> Thana
              </span>
              <span className="font-medium text-foreground">
                {thana || "Not provided"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground flex items-center gap-2">
                <MapPin className="h-4 w-4" /> City
              </span>
              <span className="font-medium text-foreground">
                {city || "Not provided"}
              </span>
            </div>
          </div>
        </div>

        {/* Account & Security Information */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-4 md:col-span-2">
          <h3 className="text-lg font-semibold text-card-foreground flex items-center gap-2 border-b border-border pb-3">
            <Shield className="h-5 w-5 text-primary" />
            Account & Security Status
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 text-sm">
            <div className="rounded-lg bg-muted/50 p-3 border border-border space-y-1">
              <span className="text-xs text-muted-foreground">Role</span>
              <p className="font-semibold text-foreground">{role}</p>
            </div>
            <div className="rounded-lg bg-muted/50 p-3 border border-border space-y-1">
              <span className="text-xs text-muted-foreground">
                Account Status
              </span>
              <p className="font-semibold text-foreground">{status}</p>
            </div>
            <div className="rounded-lg bg-muted/50 p-3 border border-border space-y-1">
              <span className="text-xs text-muted-foreground">
                Verification
              </span>
              <div className="flex items-center gap-1 font-semibold">
                {isVerified ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span className="text-foreground">Verified</span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-4 w-4 text-destructive" />
                    <span className="text-foreground">Unverified</span>
                  </>
                )}
              </div>
            </div>
            <div className="rounded-lg bg-muted/50 p-3 border border-border space-y-1">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" /> Last Updated
              </span>
              <p className="font-semibold text-foreground">
                {formatDate(updatedAt)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
