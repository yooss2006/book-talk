import { ResponseSearchBook } from "@/model/book";
import { getSavedBookByIsbn } from "./get-saved-books";
import { postBook } from "./post-book";
import { getNaverBooks } from "./get-naver-books";

export const getBook = async (isbn: string) => {
  try {
    const data = await getSavedBookByIsbn(isbn);
    if (data.length > 0) {
      return data[0];
    }

    const response = await getNaverBooks({ q: isbn });

    if (!response.ok) throw new Error();

    const { items } = (await response.json()) as ResponseSearchBook;

    if (items.length === 0) return null;

    return await postBook(items[0]);
  } catch (error: unknown) {
    console.error("데이터 로드 실패:", error);
  }
};
