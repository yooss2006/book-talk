import { getChatRoomList } from "@/api/get-chat-room-list";
import Link from "next/link";
import React from "react";
import CreateMainChatRoomButton from "./create-main-chat-room-button";
import { Book } from "@/model/book";
import style from "./create-main-chat-room-button.module.css";

type Props = {
  isbn: string;
  book: Book;
};

export default async function MainChatRoomLink({ book, isbn }: Props) {
  const chatRoomList = await getChatRoomList(isbn);
  const mainChatRoom = chatRoomList.find((item) => item.is_main_chat_room);

  return (
    <div className={style.main_chat_room_container}>
      {(() => {
        if (mainChatRoom) {
          return (
            <Link href={`/chat/${mainChatRoom.id}`} className={style.button}>
              {book.title} 채팅하기
            </Link>
          );
        }
        return <CreateMainChatRoomButton book={book} />;
      })()}
    </div>
  );
}
