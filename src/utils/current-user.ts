import jwt, { JwtPayload } from "jsonwebtoken";
import { getCookie } from "@/services/auth/tokenHandlers";
import { UserRole } from "@/utils/auth-utils";

export interface IAuthUser {
  role: UserRole;
}

interface AuthTokenPayload extends JwtPayload {
  role: UserRole;
}

export async function getCurrentUser(): Promise<IAuthUser | null> {
  const accessToken = await getCookie("accessToken");

  if (!accessToken) {
    return null;
  }

  try {
    const verifiedToken = jwt.verify(
      accessToken,
      process.env.JWT_ACCESS_SECRET as string,
    );

    if (typeof verifiedToken === "string") {
      return null;
    }

    const payload = verifiedToken as AuthTokenPayload;

    if (!payload.role) {
      return null;
    }

    return {
      role: payload.role,
    };
  } catch {
    return null;
  }
}