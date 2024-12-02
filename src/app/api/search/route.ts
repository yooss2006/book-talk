import { NAVER_CLIENT_ID, NAVER_CLIENT_SECRET, NAVER_URL } from "@/config/env";
import { ResponseSearchBook } from "@/model/book";
import { NextResponse } from "next/server";
export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  const q = searchParams.get("q") as string;
  const page = parseInt(searchParams.get("page") || "1");

  const display = 10;
  const start = (page - 1) * display + 1;

  const response = await fetch(
    `${NAVER_URL}/search/book.json?query=${q}&start=${start}&display=${display}`,
    {
      headers: {
        "X-Naver-Client-Id": NAVER_CLIENT_ID,
        "X-Naver-Client-Secret": NAVER_CLIENT_SECRET,
      },
    }
  );

  if (!response.ok) {
    return new NextResponse("Naver Book API Error", { status: 500 });
  }

  return NextResponse.json((await response.json()) as ResponseSearchBook);
}
