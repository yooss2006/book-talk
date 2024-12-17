import { createServerSupabaseClient } from "@/libs/supabase/server";

export const getSavedBooks = async (isbn?: string) => {
  const supabase = await createServerSupabaseClient();

  if (isbn) {
    const { data, error } = await supabase
      .from("books")
      .select("*")
      .or(`isbn.eq.${isbn}`);

    if (error) {
      console.error(`getSavedBooks Error : ${error.message}`);
      throw error;
    }

    return data;
  } else {
    const { data, error } = await supabase.from("books").select("*");

    if (error) {
      console.error(`getSavedBooks Error : ${error.message}`);
      throw error;
    }

    return data;
  }
};
