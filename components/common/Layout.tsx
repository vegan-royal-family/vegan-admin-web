import styled from "@emotion/styled";
import { PropsWithChildren, ReactNode } from "react";
import Header from "./Header";
import PerfectScrollbar from "react-perfect-scrollbar";
import { MenuType } from "types/component";

const menus: MenuType = [
  { route: "/restaurant", name: "채식 식당 관리" },
  // { route: "/recipe", name: "채식 레시피 관리" },
  { route: "/member", name: "회원 관리" },
  { route: "/operator", name: "운영자 관리" },
];

const LayoutBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`;

const PageWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 0 60px;
  flex: 1;
`;

export default function Layout({ children }: PropsWithChildren<{}>) {
  return (
    <LayoutBox>
      <Header menus={menus} />
      <PerfectScrollbar>
        <PageWrapper>{children}</PageWrapper>
      </PerfectScrollbar>
    </LayoutBox>
  );
}
