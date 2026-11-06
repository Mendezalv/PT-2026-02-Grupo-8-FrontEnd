"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getStoredUser } from "@/lib/auth";

export default function PerfilRedirect() {
  const router = useRouter();

  useEffect(() => {
    const user = getStoredUser();
    if (user?.username) {
      router.replace(`/perfil/${user.username}`);
    } else {
      router.replace("/login");
    }
  }, [router]);

  return null;
}
