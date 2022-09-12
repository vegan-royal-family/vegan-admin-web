import React from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div>
      <div>로그인 페이지</div>
      <button type="button" onClick={() => signIn()}>
        SNS 로그인
      </button>
    </div>
  );
}
