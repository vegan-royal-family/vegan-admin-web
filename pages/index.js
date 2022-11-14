import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Header from "components/common/Header";

const Home = () => {
  const { data: session } = useSession();
  return (
    <div>
      <Header />
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
