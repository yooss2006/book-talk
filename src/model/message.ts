import { Database, Json } from "./types-db";

export type UserMetadata = {
  full_name: string;
  avatar_url: string;
  user_name: string;
  name: string;
};

export type Message = Database["public"]["Tables"]["chat_messages"]["Row"] & {
  users: {
    email: string | null;
    id: string | null;
    raw_user_meta_data: Json;
  } | null;
};
