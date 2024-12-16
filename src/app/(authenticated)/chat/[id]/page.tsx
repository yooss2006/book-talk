import { getChatRoomById } from "@/api/get-chat-room";
import MessageList from "@/components/message";
import MessageProvider from "@/components/message-provider";
import SendMessageForm from "@/components/send-message-form";

import styles from "./page.module.css";
import Description from "@/components/description";

export default async function ChatDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const chatRoom = await getChatRoomById(id);
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.title}>{chatRoom.title}</h2>
        <Description text={chatRoom.description ?? ""} />
      </header>

      <div className={styles.chatContainer}>
        <div className={styles.messageArea}>
          <MessageProvider>
            <MessageList chatRoomId={id} />
          </MessageProvider>
        </div>
        <SendMessageForm />
      </div>
    </div>
  );
}
