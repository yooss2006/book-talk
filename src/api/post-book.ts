import { createServerSupabaseClient } from "@/libs/supabase/server";
import { Book } from "@/model/book";

export const postBook = async (payload: Book) => {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("books")
    .insert(payload)
    .select("*")
    .single();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
};
