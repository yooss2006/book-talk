"use client";

import { format } from "date-fns";
import { ko } from "date-fns/locale";

import { Database } from "@/model/types-db";

import styles from "./message.module.css";
import { useEffect, useRef } from "react";

export type Message = Database["public"]["Tables"]["chat_messages"]["Row"];

function Message(props: Message & { userId: string }) {
  const { content, userId: user_id, author_id, created_at } = props;
  const isMyMessage = user_id === author_id;

  const formattedTime = format(new Date(created_at ?? ""), "a h:mm", {
    locale: ko,
  });

  return (
    <li
      className={`${styles.message} ${
        isMyMessage ? styles.myMessage : styles.otherMessage
      }`}
    >
      <div className={styles.messageContent}>
        <div className={styles.author}>{isMyMessage ? "나" : "남"}</div>
        <div className={styles.content}>{content}</div>
        <div className={styles.time}>{formattedTime}</div>
      </div>
    </li>
  );
}

type Props = {
  messages: Array<Message>;
  userId: string;
};

export default function MessageList({ messages, userId }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (container && messages.at(-1)?.author_id === userId) {
      const isAtBottom = container.scrollTop === 0;

      if (!isAtBottom) {
        containerRef.current.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    }
  }, [messages, userId]);

  return (
    <div ref={containerRef} className={styles.container}>
      <ul className={styles.messageList}>
        {messages.map((message) => (
          <Message key={message.id} {...message} userId={userId} />
        ))}
      </ul>
    </div>
  );
}
