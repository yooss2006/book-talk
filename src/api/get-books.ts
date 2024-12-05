import { ResponseSearchBook } from "@/model/book";

type Params = {
  q: string;
  page?: number;
};

export const getBooks = async ({ q, page = 1 }: Params) => {
  try {
    const response = await fetch(`/api/search?q=${q}&page=${page}`);

    if (!response.ok) {
      throw new Error();
    }

    return (await response.json()) as ResponseSearchBook;
  } catch (error: unknown) {
    console.error("데이터 로드 실패:", error);
  }
};
