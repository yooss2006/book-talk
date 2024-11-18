import { getChatRoomList } from "@/api/get-chat-room-list";
import Link from "next/link";
import React from "react";
import CreateMainChatRoomButton from "./create-main-chat-room-button";
import { Book } from "@/model/book";

type Props = {
  isbn: string;
  book: Book;
};

export default async function MainChatRoomLink({ book, isbn }: Props) {
  const chatRoomList = await getChatRoomList(isbn);
  const mainChatRoom = chatRoomList.find((item) => item.is_main_chat_room);

  if (mainChatRoom) {
    return (
      <Link href={`/chat/${mainChatRoom.id}`}>{book.title} 채팅하기2</Link>
    );
  }
  return <CreateMainChatRoomButton book={book} />;
}
