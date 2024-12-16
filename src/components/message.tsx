import { format } from "date-fns";
import { ko } from "date-fns/locale";

import { getAllMessages } from "@/api/get-all-messages";
import { createServerSupabaseClient } from "@/libs/supabase/server";
import { Database } from "@/model/types-db";

import styles from "./message.module.css";

export type Message = Database["public"]["Tables"]["chat_messages"]["Row"] & {
  userId: string;
};

function Message(props: Message) {
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
  chatRoomId: string;
};

export default async function MessageList({ chatRoomId }: Props) {
  const supabase = await createServerSupabaseClient();
  const messages = await getAllMessages(chatRoomId);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  return (
    <div className={styles.container}>
      <ul className={styles.messageList}>
        {messages.map((message) => (
          <Message key={message.id} {...message} userId={user.id} />
        ))}
      </ul>
    </div>
  );
}
