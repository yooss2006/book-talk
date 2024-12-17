import BookInfo from "@/components/book-info";
import ChatRoomList from "@/components/chat-room-list";

import style from "./page.module.css";
import { getBook } from "@/api/get-book";

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ isbn: string }>;
}) {
  const { isbn } = await params;
  const book = await getBook(isbn);

  if (!book) return "책 정보가 없습니다.";

  return (
    <div className={style.container}>
      <BookInfo {...book} />
      <ChatRoomList isbn={isbn} />
    </div>
  );
}
