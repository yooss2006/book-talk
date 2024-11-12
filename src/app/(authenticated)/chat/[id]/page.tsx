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
      <div>채팅 메시지s</div>
      <SendMessageForm />
    </div>
  );
}
