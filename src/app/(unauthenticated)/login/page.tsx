import KakaoLoginButton from "@/components/kakao-login-button";
import { Suspense } from "react";

export default async function LoginPage() {
  return (
    <div>
      <h2>로그인</h2>
      <Suspense fallback="로딩중...">
        <KakaoLoginButton />
      </Suspense>
    </div>
  );
}
