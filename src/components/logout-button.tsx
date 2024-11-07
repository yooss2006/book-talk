"use client";

import { createBrowserSupabaseClient } from "@/libs/supabase/client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const supabase = createBrowserSupabaseClient();
  const router = useRouter();

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(`logout Error`);
    } else {
      router.refresh();
    }
  };

  return <button onClick={logout}>로그아웃</button>;
}
