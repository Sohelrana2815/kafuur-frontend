import { UserRole } from "@/utils/auth-utils";

export interface UserInfo {
  name: string;
  email: string;
  role: UserRole;
}
