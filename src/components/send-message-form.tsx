"use client";

import { createMessage } from "@/actions/create-message";
import { useParams } from "next/navigation";
import { useActionState } from "react";

export default function SendMessageForm() {
  const { id } = useParams();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, formAction, isPending] = useActionState(createMessage, null);

  return (
    <form action={formAction}>
      <input name="content" />
      <input name="chatRoomId" hidden readOnly value={id} />
      <button type="submit" disabled={isPending}>
        제출
      </button>
    </form>
  );
}
