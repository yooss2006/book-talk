import { NAVER_CLIENT_ID, NAVER_CLIENT_SECRET, NAVER_URL } from "@/config/env";

type Params = {
  q: string;
  start?: number;
  display?: number;
};

export const getNaverBooks = async ({ q, start = 1, display = 10 }: Params) => {
  const response = await fetch(
    `${NAVER_URL}/search/book.json?query=${q}&start=${start}&display=${display}`,
    {
      headers: {
        "X-Naver-Client-Id": NAVER_CLIENT_ID,
        "X-Naver-Client-Secret": NAVER_CLIENT_SECRET,
      },
    }
  );

  return response;
};
