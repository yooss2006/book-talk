import { getChatRoomList } from "@/api/get-chat-room-list";
import { Database } from "@/model/types-db";
import Link from "next/link";
import React from "react";

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
    <div>
      <div>채팅방 목록</div>
      <ul>
        {subChatRoomList.map((chatRoom) => (
          <ChatRoomLink key={chatRoom.id} {...chatRoom} />
        ))}
      </ul>
    </div>
  );
}
