import { createServerSupabaseClient } from "@/libs/supabase/server";

type Payload = {
  chat_room_id: string;
  content: string;
  author_id: string;
};

export const postMessage = async (payload: Payload) => {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("chat_messages")
    .insert(payload)
    .select("*")
    .single();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
};
