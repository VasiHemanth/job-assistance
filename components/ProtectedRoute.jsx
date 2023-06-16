"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/useCurrentUser";

export default function ProtectedRoute(children) {
  const router = useRouter();
  const { currentUser } = useCurrentUser();

  useEffect(() => {
    if (currentUser === null) {
      router.push("/login");
    }
  }, [router, currentUser]);

  return <>{currentUser ? { children } : null}</>;
}
