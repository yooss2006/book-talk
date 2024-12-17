import { format } from "date-fns";
import { ko } from "date-fns/locale";

import styles from "./message.module.css";
import type { Message, UserMetadata } from "@/model/message";
import Image from "next/image";

function Message(props: Message & { userId: string }) {
  const { content, userId: user_id, author_id, created_at, users } = props;
  const { avatar_url, full_name } =
    (users?.raw_user_meta_data as UserMetadata) || {};
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
        <Image
          src={avatar_url}
          alt={full_name}
          width={30}
          height={30}
          objectFit="cover"
          className={styles.avatar}
        />
        <div>
          <div className={styles.author}>{isMyMessage ? "나" : full_name}</div>
          <div className={styles.content}>{content}</div>
          <div className={styles.time}>{formattedTime}</div>
        </div>
      </div>
    </li>
  );
}

type Props = {
  messages: Array<Message>;
  userId: string;
};

export default function MessageList({ messages, userId }: Props) {
  return (
    <ul className={styles.messageList}>
      {messages.map((message) => (
        <Message key={message.id} {...message} userId={userId} />
      ))}
    </ul>
  );
}
