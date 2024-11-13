import { createServerSupabaseClient } from "@/libs/supabase/server";

export const getChatRoomList = async (isbn: string) => {
  const supabase = await createServerSupabaseClient();

  const { data, error: chatRoomError } = await supabase
    .from("chat_rooms")
    .select("*")
    .or(`isbn.eq.${isbn}`)
    .order("created_at", { ascending: true });

  if (chatRoomError) {
    return [];
  }

  return data;
};
