import { ResponseSearchBook } from "@/model/book";

type Params = {
  q: string;
  page?: number;
  signal?: AbortSignal;
};

export const getBooks = async ({ q, page = 1, signal }: Params) => {
  try {
    const response = await fetch(`/api/search?q=${q}&page=${page}`, {
      signal,
    });

    if (!response.ok) {
      throw new Error();
    }

    return (await response.json()) as ResponseSearchBook;
  } catch (error: unknown) {
    if (error instanceof Error && error.name !== "AbortError") {
      console.error("데이터 로드 실패:", error);
    }
  }
};
