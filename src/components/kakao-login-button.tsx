"use client";

import { PROD_URL } from "@/config/env";
import { createBrowserSupabaseClient } from "@/libs/supabase/client";
import { useSearchParams } from "next/navigation";

export default function KakaoLoginButton() {
  const supabase = createBrowserSupabaseClient();

  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/";

  const login = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "kakao",
      options: {
        redirectTo: PROD_URL
          ? `${PROD_URL}/auth/callback?next=${next}`
          : `http://localhost:3000/auth/callback?next=${next}`,
      },
    });

    if (error) {
      throw error;
    }
  };
  return <button onClick={login}>카카오</button>;
}
