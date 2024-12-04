import { getBooks } from "@/api/get-books";
import BookInfo from "@/components/book-info";
import ChatRoomList from "@/components/chat-room-list";
import CreateChatRoomButton from "@/components/create-chat-room-button";
import MainChatRoomLink from "@/components/main-chat-room-link";

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ isbn: string }>;
}) {
  const { isbn } = await params;
  const response = await getBooks({ q: isbn });

  if (!response) return null;

  return (
    <div>
      <BookInfo {...response.items[0]} />
      <MainChatRoomLink isbn={isbn} book={response.items[0]} />
      <ChatRoomList isbn={isbn} />
      <CreateChatRoomButton />
    </div>
  );
}
