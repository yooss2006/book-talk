"use server";

import { getBooks } from "@/api/get-books";

export const searchBook = async (_: unknown, formData: FormData) => {
  const query = formData.get("query")?.toString();

  if (!query?.trim()) return null;

  try {
    return await getBooks(query!);
  } catch (error) {
    console.error(error);
    return null;
  }
};
