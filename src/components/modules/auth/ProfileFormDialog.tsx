import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { updateMyProfile } from "@/services/auth/auth.service";
import { IEditProfile } from "@/types/user.interface";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

interface IProfileFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  profileData?: IEditProfile;
}

export default function ProfileFormDialog({
  open,
  onClose,
  onSuccess,
  profileData,
}: IProfileFormDialogProps) {
  const [state, formAction, pending] = useActionState(updateMyProfile, null);

  const getFieldError = (fieldName: string) => {
    if (state && state.errors) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const error = state.errors.find((err: any) => err.field === fieldName);
      return error?.message;
    } else {
      return null;
    }
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
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] flex flex-col p-0 sm:max-w-[550px]">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>

        <form action={formAction} className="flex flex-col flex-1 min-h-0">
          <div className="flex-1 overflow-y-auto px-6 space-y-6 py-4">
            {/* Personal Details Section */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-foreground border-b pb-1">
                Personal Details
              </h4>

              {/* Full Name */}
              <Field>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  defaultValue={profileData?.name || ""}
                />
                {getFieldError("name") && (
                  <FieldDescription className="text-red-600">
                    {getFieldError("name")}
                  </FieldDescription>
                )}
              </Field>

              {/* Phone & Alt Phone */}
              <div className="grid gap-4 sm:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="+8801..."
                    defaultValue={profileData?.phone || ""}
                  />
                  {getFieldError("phone") && (
                    <FieldDescription className="text-red-600">
                      {getFieldError("phone")}
                    </FieldDescription>
                  )}
                </Field>

                <Field>
                  <FieldLabel htmlFor="altPhone">Alt Phone Number</FieldLabel>
                  <Input
                    id="altPhone"
                    name="altPhone"
                    placeholder="+8801..."
                    defaultValue={profileData?.altPhone || ""}
                  />
                  {getFieldError("altPhone") && (
                    <FieldDescription className="text-red-600">
                      {getFieldError("altPhone")}
                    </FieldDescription>
                  )}
                </Field>
              </div>
            </div>

            {/* Section Separator */}
            <hr className="border-border" />

            {/* Address Information Section */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-foreground border-b pb-1">
                Address Information
              </h4>

              {/* Street Address */}
              <Field>
                <FieldLabel htmlFor="address">Street Address</FieldLabel>
                <Input
                  id="address"
                  name="address"
                  placeholder="House 12, Road 5, Block B"
                  defaultValue={profileData?.address || ""}
                />
                {getFieldError("address") && (
                  <FieldDescription className="text-red-600">
                    {getFieldError("address")}
                  </FieldDescription>
                )}
              </Field>

              {/* Thana & City */}
              <div className="grid gap-4 sm:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="thana">Thana</FieldLabel>
                  <Input
                    id="thana"
                    name="thana"
                    placeholder="Dhanmondi"
                    defaultValue={profileData?.thana || ""}
                  />
                  {getFieldError("thana") && (
                    <FieldDescription className="text-red-600">
                      {getFieldError("thana")}
                    </FieldDescription>
                  )}
                </Field>

                <Field>
                  <FieldLabel htmlFor="city">City</FieldLabel>
                  <Input
                    id="city"
                    name="city"
                    placeholder="Dhaka"
                    defaultValue={profileData?.city || ""}
                  />
                  {getFieldError("city") && (
                    <FieldDescription className="text-red-600">
                      {getFieldError("city")}
                    </FieldDescription>
                  )}
                </Field>
              </div>
            </div>
          </div>

          {/* Sticky Action Footer */}
          <div className="flex justify-end gap-2 px-6 py-4 border-t bg-background">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={pending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={pending}>
              {pending ? "Saving..." : "Update Profile"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
