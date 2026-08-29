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
  if (isDeleted) {
    return <Badge variant="destructive">{deletedText}</Badge>;
  }

  if (isVerified === true) {
    return <Badge>Verified</Badge>;
  }

  if (isVerified === false) {
    return <Badge variant="secondary">Not Verified</Badge>;
  }

  switch (status) {
    case "ACTIVE":
      return <Badge>{activeText}</Badge>;

    case "BLOCKED":
      return <Badge variant="secondary">Blocked</Badge>;

    case "BANNED":
      return <Badge variant="destructive">Banned</Badge>;

    case "DELETED":
      return <Badge variant="destructive">{deletedText}</Badge>;

    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
}
