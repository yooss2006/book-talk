import { Suspense } from "react";
import styles from "./page.module.css";
import SocialLoginButton from "@/components/social-login-button";

export default async function LoginPage() {
  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h1 className={styles.title}>로그인</h1>
        <p className={styles.description}>
          소셜 계정으로 간편하게 로그인하세요
        </p>

        <div className={styles.buttonGroup}>
          <Suspense fallback="로딩중...">
            <SocialLoginButton type="google" />
            <SocialLoginButton type="kakao" />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
