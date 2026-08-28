"use client";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { useRouter } from "next/navigation";
import { useCallback, useState, useTransition } from "react";

export default function UsersManagementHeader() {
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
  return (
    <>
      {/* <UserFormDialog
        open={isDialogOpen}
        onClose={handleClose}
        onSuccess={handleSuccess}
      /> */}

      <ManagementPageHeader
        title="Users Management"
        description="Manage Users information"
      />
    </>
  );
}
