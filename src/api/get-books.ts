import { NAVER_CLIENT_ID, NAVER_CLIENT_SECRET, NAVER_URL } from "@/config/env";
import { ResponseSearchBook } from "@/model/book";

export const getBooks = async (query: string) => {
  const response = await fetch(`${NAVER_URL}/search/book.json?query=${query}`, {
    headers: {
      "X-Naver-Client-Id": NAVER_CLIENT_ID,
      "X-Naver-Client-Secret": NAVER_CLIENT_SECRET,
    },
  });

  if (!response.ok) {
    throw new Error();
  }

  return (await response.json()) as ResponseSearchBook;
};
