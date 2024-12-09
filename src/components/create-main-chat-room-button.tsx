"use client";

import { createChatRoom } from "@/actions/create-chat-room";
import { Book } from "@/model/book";
import { useRouter } from "next/navigation";
import React, { useActionState, useEffect } from "react";
import style from "./create-main-chat-room-button.module.css";

type Props = {
  book: Book;
};

export default function CreateMainChatRoomButton({ book }: Props) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(createChatRoom, null);

  useEffect(() => {
    if (state?.id) {
      router.replace(`/chat/${state.id}`);
    }
  }, [router, state]);

  return (
    <form action={formAction}>
      <input name="title" hidden readOnly value={book.title} />
      <textarea name="description" hidden readOnly value={book.description} />
      <input name="isbn" hidden readOnly value={book.isbn} />
      <input name="is_main_chat_room" hidden readOnly value="true" />
      <button type="submit" disabled={isPending} className={style.button}>
        {book.title} 채팅 시작하기
      </button>
    </form>
  );
}
