import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const Home = () => {
  const { data: session } = useSession();

  return (
    <div>
      <div>메인 페이지</div>
      {session ? (
        <button type="button" onClick={() => signOut()}>
          로그아웃
        </button>
      ) : (
        <Link href="/login">
          <a>로그인</a>
        </Link>
      )}
    </div>
  );
};

export default Home;
