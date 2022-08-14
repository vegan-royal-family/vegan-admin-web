import React, { useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Login() {
  const { data: session } = useSession();
  const { accessToken } = session || {};

  useEffect(() => {
    if (accessToken) {
      const provider = session.provider;
      const token = session.accessToken;
      const body = {
        provider,
        token,
      };
      console.log(provider, token);
      // TODO: GET /auth/getToken에 요청
    }
  }, [accessToken]);

  return (
    <div style={{ border: "1px solid black", padding: 30 }}>
      <div>로그인 페이지입니다.</div>
      {session ? (
        <>
          {/* <div>{JSON.stringify(session)}</div> */}
          <button type="button" onClick={() => signOut()}>
            로그아웃
          </button>
        </>
      ) : (
        <button type="button" onClick={() => signIn()}>
          SNS 로그인
        </button>
      )}
    </div>
  );
}
