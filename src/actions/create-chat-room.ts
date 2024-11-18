"use server";

import { postChatRoom } from "@/api/post-chat-room";
import { createServerSupabaseClient } from "@/libs/supabase/server";

export const createChatRoom = async (_: unknown, formData: FormData) => {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const title = formData.get("title")?.toString();
  const description = formData.get("description")?.toString();
  const isbn = formData.get("isbn")?.toString();
  const is_main_chat_room =
    formData.get("is_main_chat_room")?.toString() === "true";
  const admin_user_id = user?.id;

  if (!(title && description && isbn && admin_user_id)) return null;

  return await postChatRoom({
    title,
    description,
    isbn,
    admin_user_id,
    is_main_chat_room,
  });
};
