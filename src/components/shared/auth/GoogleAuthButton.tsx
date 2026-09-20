"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
// Assuming you have a loading spinner component similar to your auth forms
import { Loader2 } from "lucide-react";

export default function GoogleAuthButton() {
  const searchParams = useSearchParams();
  const [isPending, setIsPending] = useState(false);

  const handleGoogleLogin = () => {
    setIsPending(true);

    // 1. Get the original route the user was trying to access (if any)
    const redirectParam = searchParams.get("redirect") || "/";

    // 2. Append the loggedIn=true flag so your LoggedInSuccessToast picks it up
    // Example: /booking becomes /booking?loggedIn=true
    let finalRedirect = redirectParam;
    if (finalRedirect.includes("?")) {
      finalRedirect += "&loggedIn=true";
    } else {
      finalRedirect += "?loggedIn=true";
    }

    // 3. Redirect the browser to your Express backend Google Auth route
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL   || "http://localhost:5000/api/v1";
    const googleAuthUrl = `${backendUrl}/auth/google?redirect=${encodeURIComponent(finalRedirect)}`;

    window.location.href = googleAuthUrl;
  };

  return (
    <div className="flex items-center justify-center w-full">
      <Button
        variant="outline"
        type="button"
        className="flex items-center justify-center gap-2 p-4 w-full"
        onClick={handleGoogleLogin}
        disabled={isPending}
      >
        {isPending ? (
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
        ) : (
          <>
            <Image
              src="/google-icon.svg"
              alt="Google logo"
              width={20}
              height={20}
            />
            <span>Continue with Google</span>
          </>
        )}
      </Button>
    </div>
  );
}
