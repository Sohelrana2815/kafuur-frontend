import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function GoogleAuthButton() {
  return (
    <div className="flex items-center justify-center w-full">
      <Button
        variant="outline"
        type="button"
        className="flex items-center justify-center gap-2 p-4 w-full"
      >
        <Image
          src="/google-icon.svg"
          alt="Google logo"
          width={20}
          height={20}
        />
        <span>Continue with Google</span>
      </Button>
    </div>
  );
}
