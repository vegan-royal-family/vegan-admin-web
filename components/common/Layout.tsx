import { PropsWithChildren } from "react";
import Header from "./Header";

const menus = [
  { route: "/restaurant", name: "채식 식당 관리" },
  { route: "/recipe", name: "채식 레시피 관리" },
  { route: "/member", name: "회원 관리" },
  { route: "/operator", name: "운영자 관리" },
];

export default function Layout({ children }: PropsWithChildren<{}>) {
  return (
    <div>
      <Header menus={menus} />
      {children}
    </div>
  );
}
