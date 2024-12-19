import { createServerSupabaseClient } from "@/libs/supabase/server";

export const getSavedBookByIsbn = async (isbn: string) => {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("books")
    .select("*")
    .or(`isbn.eq.${isbn}`);

  if (error) {
    console.error(`getSavedBooks Error : ${error.message}`);
    throw error;
  }

  return data;
};

export const getSavedBooks = async () => {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("books")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);

  if (error) {
    console.error(`getSavedBooks Error : ${error.message}`);
    throw error;
  }

  return data;
};
