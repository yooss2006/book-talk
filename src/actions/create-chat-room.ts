"use server";

import { postChatRoom } from "@/api/post-chat-room";

export const createChatRoom = async (_: unknown, formData: FormData) => {
  const title = formData.get("title")?.toString();
  const description = formData.get("description")?.toString();
  const isbn = formData.get("isbn")?.toString();

  if (!(title && description && isbn)) return null;

  return await postChatRoom({ title, description, isbn });
};
