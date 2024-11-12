import { getAllMessages } from "@/api/get-all-messages";
import { createServerSupabaseClient } from "@/libs/supabase/server";
import { Database } from "@/model/types-db";

export type Message = Database["public"]["Tables"]["chat_messages"]["Row"] & {
  userId: string;
};

function Message(props: Message) {
  const { content, userId: user_id, author_id } = props;
  return (
    <li>
      {user_id === author_id ? "나" : "남"}
      {content}
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
    <div>
      <ul>
        {messages.map((message) => (
          <Message key={message.id} {...message} userId={user.id} />
        ))}
      </ul>
    </div>
  );
}
