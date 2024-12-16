"use client";

import { createMessage } from "@/actions/create-message";
import { useParams } from "next/navigation";
import { useActionState } from "react";

import styles from "./send-message-form.module.css";

export default function SendMessageForm() {
  const { id } = useParams();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, formAction, isPending] = useActionState(createMessage, null);

  return (
    <form action={formAction} className={styles.form}>
      <input
        name="content"
        className={styles.input}
        placeholder="메시지를 입력하세요..."
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
