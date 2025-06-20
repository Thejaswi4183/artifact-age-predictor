// src/app/auth/callback/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error("Session fetch error:", error.message);
        return;
      }

      if (session) {
        router.push("/upload"); // ✅ redirect to main app page
      } else {
        router.push("/auth"); // 👈 fallback to auth page
      }
    };

    checkSession();
  }, [router]);

  return (
    <div className="container">
      <p>Authenticating...</p>
    </div>
  );
}
