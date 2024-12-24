"use client";

import { BASE_URL } from "@/config/env";
import { createBrowserSupabaseClient } from "@/libs/supabase/client";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

import styles from "./social-login.module.css";

type Provider = "kakao" | "google";

const SOCIAL_TYPE = {
  kakao: {
    icon: "/icon/kakao-logo.svg",
    name: "kakao",
  },
  google: {
    icon: "/icon/google-logo.svg",
    name: "google",
  },
};

type Props = {
  type: Provider;
};

export default function SocialLoginButton({ type }: Props) {
  const supabase = createBrowserSupabaseClient();

  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/";
  const socialTypeObj = SOCIAL_TYPE[type];

  const login = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: socialTypeObj.name as Provider,
      options: {
        redirectTo: BASE_URL
          ? `${BASE_URL}/auth/callback?next=${next}`
          : `http://localhost:3000/auth/callback?next=${next}`,
      },
    });

    if (error) {
      throw error;
    }
  };
  return (
    <button onClick={login} className={styles.socialButton}>
      <Image
        src={socialTypeObj.icon}
        alt={socialTypeObj.name}
        width={20}
        height={20}
      />
      {socialTypeObj.name}로 계속하기
    </button>
  );
}
