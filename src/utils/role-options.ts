import { UserRole } from "./auth-utils";

export const roleOptions: {
  label: string;
  value: UserRole;
}[] = [
  {
    label: "Customer",
    value: "CUSTOMER",
  },
  {
    label: "Admin",
    value: "ADMIN",
  },
];
