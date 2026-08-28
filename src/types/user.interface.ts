import { UserRole } from "@/utils/auth-utils";

export interface UserInfo {
  name: string;
  email: string;
  role: UserRole;
}
export interface IUserProfile {
  id?: string;
  name: string | null;
  email: string;
  picture: string | null;
  role: UserRole;
  status: "ACTIVE" | "BLOCKED" | "BANNED" | "DELETED";
  isVerified: boolean;
  phone: string | null;
  altPhone: string | null;
  address: string | null;
  city: string | null;
  thana: string | null;
  createdAt: string; // ISO Date String
  updatedAt: string; // ISO Date String
}
export interface IEditProfile {
  name: string;
  picture: string;
  phone: string;
  altPhone: string;
  city: string;
  thana: string;
  address: string;
}

export interface IUser {
  id?: string;
  name: string | null;
  email: string;
  picture: string | null;
  role: UserRole;
  status: "ACTIVE" | "BLOCKED" | "BANNED" | "DELETED";
  isVerified: boolean;
  phone: string | null;
  altPhone: string | null;
  address: string | null;
  city: string | null;
  thana: string | null;
  createdAt: string; // ISO Date String
  updatedAt: string; // ISO Date String
}

export interface IEditUserByAdmin {
  id?: string ;
  name: string;
  picture: string;
  role: UserRole;
  status: "ACTIVE" | "BLOCKED" | "BANNED" | "DELETED";
  isVerified: boolean;
  phone: string;
  altPhone: string;
  city: string;
  thana: string;
  address: string;
}
