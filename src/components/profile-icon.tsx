import { createServerSupabaseClient } from "@/libs/supabase/server";
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
      width={50}
      height={50}
      alt={user.user_metadata?.full_name}
    />
  );
}
