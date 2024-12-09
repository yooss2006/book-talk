import { getNaverBooks } from "@/api/get-naver-books";
import BookInfo from "@/components/book-info";
import ChatRoomList from "@/components/chat-room-list";
import { ResponseSearchBook } from "@/model/book";

import style from "./page.module.css";

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ isbn: string }>;
}) {
  const { isbn } = await params;
  const response = await getNaverBooks({ q: isbn });

  if (!response.ok) {
    throw new Error("에러");
  }

  const book = ((await response.json()) as ResponseSearchBook).items[0];

  return (
    <div className={style.container}>
      <BookInfo {...book} />
      <ChatRoomList isbn={isbn} />
    </div>
  );
}
