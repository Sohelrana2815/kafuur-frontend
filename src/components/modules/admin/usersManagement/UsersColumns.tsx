"use client";

import Image from "next/image";

import { StatusBadgeCell } from "@/components/shared/cell/StatusBadgeCell";
import { Column } from "@/components/shared/ManagementTable";
import { IUser } from "@/types/user.interface";

export const usersColumns: Column<IUser>[] = [
  {
    header: "Image",
    accessor: (user) => (
      <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border bg-muted">
        {user.picture ? (
          <Image
            src={user.picture}
            alt={user.name || "User"}
            width={40}
            height={40}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
            N/A
          </div>
        )}
      </div>
    ),
  },

  {
    header: "Name",
    accessor: (user) => (
      <span className="font-medium">{user.name || "N/A"}</span>
    ),
  },

  {
    header: "Email",
    accessor: (user) => (
      <span className="text-sm text-muted-foreground">{user.email}</span>
    ),
  },

  {
    header: "Phone",
    accessor: (user) => <span className="text-sm">{user.phone || "N/A"}</span>,
  },

  {
    header: "Role",
    accessor: (user) => <span className="font-medium">{user.role}</span>,
  },

  {
    header: "Status",
    accessor: (user) => <StatusBadgeCell status={user.status} />,
  },

  {
    header: "Verification",
    accessor: (user) => <StatusBadgeCell isVerified={user.isVerified} />,
  },
];
