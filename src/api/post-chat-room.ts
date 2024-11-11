import { createServerSupabaseClient } from "@/libs/supabase/server";

type Payload = {
  title: string;
  description: string;
  isbn: string;
};

export const postChatRoom = async (payload: Payload) => {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("chat_rooms")
    .insert({
      ...payload,
      admin_user_id: user?.id,
    })
    .select("*")
    .single();

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
};
