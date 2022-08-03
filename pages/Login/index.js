export default function Login() {
  return (
    <div style={{ border: "1px solid black", padding: 30 }}>
      <div>로그인 페이지입니다.</div>
      <div>
        ID: <input type="text" name="email" />
        PW: <input type="password" name="password" />
      </div>
      <div>SNS 로그인</div>
      <button>카카오</button>
      <button>네이버</button>
      <button>구글</button>
    </div>
  );
}
