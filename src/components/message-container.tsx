"use client";

import type { Message } from "@/model/message";
import { ReactNode, useEffect, useRef } from "react";

import styles from "./message-container.module.css";

type Props = {
  children: ReactNode;
  messages: Array<Message>;
  userId: string;
};

export default function MessageContainer({
  children,
  messages,
  userId,
}: Props) {
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
      {children}
    </div>
  );
}
