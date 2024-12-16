import { createServerSupabaseClient } from "@/libs/supabase/server";

export const getChatRoomById = async (id: string) => {
  const supabase = await createServerSupabaseClient();

  const { data, error: chatRoomError } = await supabase
    .from("chat_rooms")
    .select("*")
    .or(`id.eq.${id}`)
    .single();

  if (chatRoomError) {
    console.error(`getChatRoom Error : ${chatRoomError.message}`);
    throw chatRoomError;
  }

  return data;
};
