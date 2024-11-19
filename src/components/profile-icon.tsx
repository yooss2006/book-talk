import { createServerSupabaseClient } from "@/libs/supabase/server";
import style from "./profile-icon.module.css";
import Image from "next/image";

export default async function ProfileIcon() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

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
