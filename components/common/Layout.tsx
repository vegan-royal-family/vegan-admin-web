import { useRouter } from "next/router";
import { PropsWithChildren } from "react";
import Footer from "./Footer";
import Header from "./Header";

const adminMenus = [
  { route: "/manage/restaurant", name: "채식 식당 관리" },
  { route: "/manage/recipe", name: "채식 레시피 관리" },
  { route: "/manage/member", name: "회원 관리" },
  { route: "/manage/operator", name: "운영자 관리" },
];

const userMenus = [
  { route: "/restaurant", name: "채식 식당" },
  { route: "/recipe", name: "채식 레시피" },
  { route: "/my-dictionary", name: "내 사전" },
];

export default function Layout({ children }: PropsWithChildren<{}>) {
  const router = useRouter();

  // "/manage" 라우트는 관리자만 접근할 수 있는 경로임
  if (router.asPath.includes("/manage")) {
    return (
      <div>
        <Header menus={adminMenus} />
        {children}
      </div>
    );
  } else {
    return (
      <div>
        <Header menus={userMenus} />
        {children}
        <Footer />
      </div>
    );
  }
}
