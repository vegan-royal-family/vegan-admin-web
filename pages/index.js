// import Login from "./Login";
import Link from "next/link";

const Home = () => {
  return (
    <div>
      Hello, Next!
      <Link href="/login">
        <a>로그인</a>
      </Link>
    </div>
  );
};

export default Home;
