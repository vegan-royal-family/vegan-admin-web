import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useTheme } from "@emotion/react";

const Home = () => {
  const theme = useTheme();
  const { data: session } = useSession();
  console.log("theme", theme);
  return (
    <div>
      <div style={{ color: theme.colors.primary[600] }}>메인 페이지</div>
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
