import LoginForm from "@/components/modules/auth/login-fom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function LoginPage({
  searchParams,
}: {
  searchParams?: Promise<{ redirect?: string }>;
}) {
    const params = (await searchParams) || {};
  return (
     <div className="flex h-svh w-full items-center justify-center p-4 overflow-hidden relative">
      {/* Absolute Back Button (Top Left) */}
      <div className="absolute top-6 left-6">
        <Button
          asChild
          className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium shadow-sm"
        >
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>

      {/* Main Login Card */}
      <div className="w-full max-w-md p-8 bg-card text-card-foreground border border-border rounded-lg shadow-sm">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold tracking-tight uppercase">
              Login
          </h1>
        </div>

        {/* Stateful client components are mounted here */}
        <LoginForm  redirect={params.redirect} />
      </div>
    </div>
  );
}