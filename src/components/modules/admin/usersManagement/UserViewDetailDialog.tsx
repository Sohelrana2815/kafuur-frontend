import InfoRow from "@/components/shared/InfoRow";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { formatDate, getStatusBadge } from "@/lib/formatters";
import { IUser } from "@/types/user.interface";
import { Calendar, Mail, MapPin, Phone, ShieldAlert, User } from "lucide-react";

interface IUserViewDetailDialogProps {
  open: boolean;
  onClose: () => void;
  user: IUser | null;
}

export default function UserViewDetailDialog({
  open,
  onClose,
  user,
}: IUserViewDetailDialogProps) {
  if (!user) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full sm:max-w-4xl max-h-[90vh] flex flex-col p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <DialogTitle className="text-xl">User Profile Details</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {/* Header Banner */}
          <div className="flex flex-col sm:flex-row items-start justify-between gap-4 p-6 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 rounded-xl border">
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge className={getStatusBadge(user.status)}>
                  {user.status || "UNKNOWN"}
                </Badge>

                <Badge variant={user.isVerified ? "default" : "outline"}>
                  {user.isVerified ? "Verified" : "Unverified"}
                </Badge>

                <Badge variant="secondary" className="flex items-center gap-1">
                  <ShieldAlert className="h-3 w-3" />
                  {user.role}
                </Badge>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                {user.name || "N/A"}
              </h2>

              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <Mail className="h-4 w-4" />
                {user.email}
              </p>
            </div>
          </div>

          {/* Contact & Location Metadata */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <User className="h-5 w-5 text-indigo-600" />
              <h3 className="font-semibold text-lg">Contact & Location</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-muted/40 p-4 rounded-lg border">
              <div className="flex items-start gap-3">
                <Phone className="h-4 w-4 mt-1 text-muted-foreground" />
                <InfoRow label="Phone" value={user.phone || "N/A"} />
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-4 w-4 mt-1 text-muted-foreground" />
                <InfoRow label="Alt Phone" value={user.altPhone || "N/A"} />
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                <InfoRow label="City" value={user.city || "N/A"} />
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                <InfoRow label="Thana" value={user.thana || "N/A"} />
              </div>
            </div>
          </div>

          <Separator />

          {/* Expanded Details Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Address */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="h-5 w-5 text-emerald-600" />
                <h3 className="font-semibold text-lg">Full Address</h3>
              </div>
              <div className="bg-muted/40 p-4 rounded-lg border text-sm leading-relaxed whitespace-pre-line text-foreground/90 h-[100px]">
                {user.address || "No detailed address provided."}
              </div>
            </div>

            {/* Account History */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold text-lg">Account History</h3>
              </div>

              <div className="bg-muted/40 p-4 rounded-lg border h-24 flex justify-between">
                <div className="flex items-start gap-3">
                  <Calendar className="h-4 w-4 mt-1 text-muted-foreground" />
                  <InfoRow
                    label="Joined Date"
                    value={formatDate(user.createdAt)}
                  />
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="h-4 w-4 mt-1 text-muted-foreground" />
                  <InfoRow
                    label="Last Updated"
                    value={formatDate(user.updatedAt)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
