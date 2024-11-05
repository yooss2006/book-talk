"use server";

import {
  SUPABASE_ANON_KEY,
  SUPABASE_SERVICE_ROLE,
  SUPABASE_URL,
} from "@/config/env";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

export const createServerSupabaseClient = async (
  cookieStore: ReturnType<typeof cookies> = cookies(),
  admin: boolean = false
) => {
  const cookieObject = await cookieStore;
  return createServerClient(
    SUPABASE_URL,
    admin ? SUPABASE_SERVICE_ROLE : SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name: string) {
          return cookieObject.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieObject.set({ name, value, ...options });
          } catch (error) {
            console.log(`Error Message: Supabase Server Set ${error}`);
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieObject.set({ name, value: "", ...options });
          } catch (error) {
            console.error(`Error Message: Supabase Server Remove ${error}`);
          }
        },
      },
    }
  );
};

export const createServerSupabaseAdminClient = async (
  cookieStore: ReturnType<typeof cookies> = cookies()
) => {
  return createServerSupabaseClient(cookieStore, true);
};
