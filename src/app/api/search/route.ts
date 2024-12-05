import { getNaverBooks } from "@/api/get-naver-books";
import { ResponseSearchBook } from "@/model/book";
import { NextResponse } from "next/server";
export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  const q = searchParams.get("q") as string;
  const page = parseInt(searchParams.get("page") || "1");

  const display = 10;
  const start = (page - 1) * display + 1;

  const response = await getNaverBooks({ q, start, display });

  if (!response.ok) {
    return new NextResponse("Naver Book API Error", { status: 500 });
  }

  return NextResponse.json((await response.json()) as ResponseSearchBook);
}
