import { getChatRoomById } from "@/api/get-chat-room";
import MessageList from "@/components/message";
import MessageProvider from "@/components/message-provider";
import SendMessageForm from "@/components/send-message-form";

import styles from "./page.module.css";
import Description from "@/components/description";
import { createServerSupabaseClient } from "@/libs/supabase/server";
import { getAllMessages } from "@/api/get-all-messages";

export default async function ChatDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createServerSupabaseClient();

  const chatRoom = await getChatRoomById(id);
  const messages = await getAllMessages(id);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.title}>{chatRoom.title}</h2>
        <Description text={chatRoom.description ?? ""} />
      </header>

      <div className={styles.chatContainer}>
        <div className={styles.messageArea}>
          <MessageProvider>
            <MessageList messages={messages} userId={user.id} />
          </MessageProvider>
        </div>
        <SendMessageForm />
      </div>
    </div>
  );
}
