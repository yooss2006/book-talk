"use client";

import { createMessage } from "@/actions/create-message";
import { useParams } from "next/navigation";
import { KeyboardEvent, useActionState, useEffect, useRef } from "react";

import styles from "./send-message-form.module.css";

export default function SendMessageForm() {
  const { id } = useParams();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, formAction, isPending] = useActionState(createMessage, null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const form = e.currentTarget.form;
      if (form) {
        const submitButton = form.querySelector(
          'button[type="submit"]'
        ) as HTMLButtonElement;
        submitButton?.click();
      }
    }
  };

  useEffect(() => {
    adjustHeight();
  }, []);

  return (
    <form action={formAction} className={styles.form}>
      <textarea
        ref={textareaRef}
        name="content"
        className={styles.input}
        placeholder="메시지를 입력하세요..."
        rows={1}
        onInput={adjustHeight}
        onKeyDown={handleKeyDown}
      />
      <input name="chatRoomId" hidden readOnly value={id} />
      <button
        type="submit"
        disabled={isPending}
        className={styles.submitButton}
      >
        전송
      </button>
    </form>
  );
}
