import { UserRole } from "@/utils/auth-utils";

export interface UserInfo {
    email: string;
    role: UserRole;
}