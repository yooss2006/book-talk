"use client";
import style from "./profile-icon.module.css";
import Image from "next/image";
import { createBrowserSupabaseClient } from "@/libs/supabase/client";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";

export default function ProfileIcon() {
  const [user, setUser] = useState<User | null>(null);
  const supabase = createBrowserSupabaseClient();

  useEffect(() => {
    supabase.auth.getUser().then((res) => {
      setUser(res.data.user);
    });
  }, [supabase.auth]);

  if (!user) return null;

  return (
    <Image
      src={user.user_metadata?.avatar_url ?? ""}
      width={40}
      height={40}
      alt={user.user_metadata?.full_name}
      className={style.image}
    />
  );
}
