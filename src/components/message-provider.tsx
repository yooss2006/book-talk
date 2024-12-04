"use client";

import { createBrowserSupabaseClient } from "@/libs/supabase/client";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

type Props = {
  children: ReactNode;
};

export default function MessageProvider({ children }: Props) {
  const supabase = createBrowserSupabaseClient();
  const router = useRouter();

  useEffect(() => {
    const channel = supabase
      .channel("message_postgres_changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat_messages",
        },
        (payload) => {
          if (payload.eventType === "INSERT" && !payload.errors) {
            router.refresh();
          }
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [router, supabase]);

  return children;
}
