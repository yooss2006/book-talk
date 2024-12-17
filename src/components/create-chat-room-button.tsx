"use client";

import { createChatRoom } from "@/actions/create-chat-room";
import { useParams, useRouter } from "next/navigation";
import { useActionState, useEffect, useReducer, useState } from "react";

import styles from "./create-chat-room-button.module.css";

type ModalProps = {
  closeModal: () => void;
};

function CreateChatRoomModal({ closeModal }: ModalProps) {
  const { isbn } = useParams();
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(createChatRoom, null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isFormValid =
    formData.title.trim() !== "" && formData.description.trim() !== "";

  useEffect(() => {
    if (state?.id) {
      router.push(`/chat/${state.id}`);
    }
  }, [router, state]);

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={closeModal}>
          ×
        </button>
        <form className={styles.form} action={formAction}>
          <div className={styles.inputWrapper}>
            <label htmlFor="title" className={styles.label}>
              채팅방 제목
            </label>
            <input
              id="title"
              className={styles.input}
              name="title"
              placeholder="채팅방 제목을 작성하세요."
              required
              minLength={1}
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor="description" className={styles.label}>
              설명
            </label>
            <textarea
              id="description"
              className={styles.textarea}
              name="description"
              placeholder="채팅방에 대한 설명을 작성하세요."
              required
              minLength={1}
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <input name="isbn" hidden readOnly value={isbn} />
          <button
            className={styles.submitButton}
            type="submit"
            disabled={isPending || !isFormValid}
          >
            채팅방 생성
          </button>
        </form>
      </div>
    </div>
  );
}

export default function CreateChatRoomButton() {
  const [isOpen, toggleIsOpen] = useReducer((state) => {
    return !state;
  }, false);

  return (
    <>
      <button className={styles.createButton} onClick={toggleIsOpen}>
        채팅방 생성
      </button>
      {isOpen && <CreateChatRoomModal closeModal={toggleIsOpen} />}
    </>
  );
}
