import { createServerSupabaseClient } from "@/libs/supabase/server";

export const getAllMessages = async (chatRoomId: string) => {
  const supabase = await createServerSupabaseClient();

  const { data, error: getMessagesError } = await supabase
    .from("chat_messages")
    .select("*")
    .or(`chat_room_id.eq.${chatRoomId}`)
    .order("created_at", { ascending: true });

  if (getMessagesError) {
    return [];
  }

  return data;
};
