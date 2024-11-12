"use server";

import { postMessage } from "@/api/post-message";
import { createServerSupabaseClient } from "@/libs/supabase/server";

export const createMessage = async (_: unknown, formData: FormData) => {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const chat_room_id = formData.get("chatRoomId")?.toString();
  const content = formData.get("content")?.toString();
  const author_id = user?.id;

  if (!(chat_room_id && content && author_id)) return null;

  return await postMessage({ chat_room_id, content, author_id });
};
