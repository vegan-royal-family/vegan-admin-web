import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Header from "components/common/Header";
import Footer from "components/common/Footer";

const Home = () => {
  const { data: session } = useSession();
  return (
    <div>
      <Header />
      <Footer />
    </div>
  );
};

export default Home;
