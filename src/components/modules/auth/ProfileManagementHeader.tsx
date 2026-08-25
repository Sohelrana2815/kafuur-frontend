"use client";

import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import ProfileFormDialog from "./ProfileFormDialog";
import { useRouter } from "next/navigation";
import { useCallback, useState, useTransition } from "react";
import { Edit } from "lucide-react";
import { IEditProfile } from "@/types/user.interface";

interface IProfileManagementHeaderProps {
  profileData: IEditProfile;
}
export default function ProfileManagementHeader({
  profileData,
}: IProfileManagementHeaderProps) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSuccess = useCallback(() => {
    startTransition(() => {
      router.refresh();
    });
  }, [router]);
  const handleClose = useCallback(() => {
    setIsDialogOpen(false);
  }, []);
  const rawName = profileData?.name ? profileData.name.trim() : "User";
  const displayName = rawName
    ? rawName[0].toUpperCase() + rawName.slice(1).toLowerCase()
    : "User";
  return (
    <>
      <ProfileFormDialog
        open={isDialogOpen}
        onClose={handleClose}
        onSuccess={handleSuccess}
        profileData={profileData}
      />
      <ManagementPageHeader
        title={`Welcome Back, ${displayName}!`}
        description="Manage your profile information"
        action={{
          label: "Edit",
          icon: Edit,
          onClick: () => setIsDialogOpen(true),
        }}
      />
    </>
  );
}
