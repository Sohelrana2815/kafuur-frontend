"use client";

import { logoutUser } from "@/services/auth/auth.service";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

const LogoutButton = () => {
  const handleLogout = async () => {
    await logoutUser();
  };
  return (
    <Button
      className="flex h-9 w-9 items-center justify-center rounded-full border   transition-all focus:outline-none active:scale-95"
      variant={"destructive"}
      onClick={handleLogout}
      title="Logout"
    >
      <LogOut />
    </Button>
  );
};

export default LogoutButton;
