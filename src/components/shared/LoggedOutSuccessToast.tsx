"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function LoggedOutSuccessToast() {
const searchParams = useSearchParams();
const router = useRouter();
console.log(searchParams);

useEffect(()=>{
    // console.log("loggedOut Value:",searchParams.get("loggedOut"));
    if(searchParams.get("loggedOut")==="true") {
        toast.success("You have been logged out successfully!")
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.delete("loggedOut")
        router.replace(newUrl.toString());
    }
},[searchParams,router])
  return (
    null
  )
}
