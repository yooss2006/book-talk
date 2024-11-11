"use client";

import { createChatRoom } from "@/actions/create-chat-room";
import { useParams, useRouter } from "next/navigation";
import { useActionState, useEffect, useReducer } from "react";

type ModalProps = {
  closeModal: () => void;
};

function CreateChatRoomModal({ closeModal }: ModalProps) {
  const { isbn } = useParams();
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(createChatRoom, null);

  useEffect(() => {
    if (state?.id) {
      router.replace(`/chat/${state.id}`);
    }
  }, [router, state]);

  return (
    <div>
      <button onClick={closeModal}>x</button>
      <form action={formAction}>
        <input name="title" placeholder="채팅방 제목을 작성하세요." />
        <textarea
          name="description"
          placeholder="채팅방에 대한 설명을 작성하세요."
        />
        <input name="isbn" hidden readOnly value={isbn} />
        <button type="submit" disabled={isPending}>
          채팅방 생성
        </button>
      </form>
    </div>
  );
}

export default function CreateChatRoomButton() {
  const [isOpen, toggleIsOpen] = useReducer((state) => {
    return !state;
  }, false);

  return (
    <>
      <button onClick={toggleIsOpen}>채팅방 생성</button>
      {isOpen && <CreateChatRoomModal closeModal={toggleIsOpen} />}
    </>
  );
}
