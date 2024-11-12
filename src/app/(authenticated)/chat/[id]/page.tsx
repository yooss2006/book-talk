import MessageList from "@/components/message";
import MessageProvider from "@/components/message-provider";
import SendMessageForm from "@/components/send-message-form";

export default async function ChatDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div>
      <header>채팅방 {id} 페이지</header>
      <MessageProvider>
        <MessageList chatRoomId={id} />
      </MessageProvider>
      <SendMessageForm />
    </div>
  );
}
