import { getChatRoomList } from "@/api/get-chat-room-list";
import { Database } from "@/model/types-db";
import Link from "next/link";
import React from "react";
import CreateChatRoomButton from "./create-chat-room-button";

import style from "./chat-room-list.module.css";

type Props = {
  isbn: string;
};

function ChatRoomLink(
  props: Database["public"]["Tables"]["chat_rooms"]["Row"]
) {
  const { title, description, id } = props;
  return (
    <Link href={`/chat/${id}`}>
      <div>제목 : {title}</div>
      <div>내용 : {description}</div>
    </Link>
  );
}

export default async function ChatRoomList({ isbn }: Props) {
  const chatRoomList = await getChatRoomList(isbn);
  const subChatRoomList = chatRoomList.filter(
    (item) => !item.is_main_chat_room
  );
  return (
    <section>
      <header className={style.header}>
        <h2>다른 채팅방 목록</h2>
        <CreateChatRoomButton />
      </header>
      <ul>
        {subChatRoomList.map((chatRoom) => (
          <ChatRoomLink key={chatRoom.id} {...chatRoom} />
        ))}
      </ul>
    </section>
  );
}
