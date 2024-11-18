import { createServerSupabaseClient } from "@/libs/supabase/server";

type Payload = {
  admin_user_id: string;
  is_main_chat_room: boolean;
  title: string;
  description: string;
  isbn: string;
};

export const postChatRoom = async (payload: Payload) => {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("chat_rooms")
    .insert(payload)
    .select("*")
    .single();

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
};
