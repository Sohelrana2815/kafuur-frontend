"use client";

import { Badge } from "@/components/ui/badge";

interface StatusBadgeCellProps {
  status?: "ACTIVE" | "BLOCKED" | "BANNED" | "DELETED";
  isDeleted?: boolean;
  isVerified?: boolean;
  activeText?: string;
  deletedText?: string;
}

export function StatusBadgeCell({
  status,
  isDeleted,
  isVerified,
  activeText = "Active",
  deletedText = "Deleted",
}: StatusBadgeCellProps) {
  // Deleted status
  if (isDeleted || status === "DELETED") {
    return (
      <Badge variant="destructive">
        {deletedText}
      </Badge>
    );
  }

  // User status
  if (status) {
    const statusText = {
      ACTIVE: "Active",
      BLOCKED: "Blocked",
      BANNED: "Banned",
      DELETED: "Deleted",
    };

    const statusVariant = {
      ACTIVE: "default",
      BLOCKED: "secondary",
      BANNED: "destructive",
      DELETED: "destructive",
    } as const;

    return (
      <Badge variant={statusVariant[status]}>
        {statusText[status]}
      </Badge>
    );
  }

  // Verification status
  if (typeof isVerified === "boolean") {
    return (
      <Badge variant={isVerified ? "default" : "secondary"}>
        {isVerified ? "Verified" : "Not Verified"}
      </Badge>
    );
  }

  return (
    <Badge variant="default">
      {activeText}
    </Badge>
  );
}