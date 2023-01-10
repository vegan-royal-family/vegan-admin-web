import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import { authState } from "states/auth";
import Logo from "assets/Logo/Logo.png";

type MenuType = Array<{ route: string; name: string }>;

const UserProfileBox = () => {
  return <button onClick={() => {}}>로그아웃</button>;
};

export default function Header(props: { menus: MenuType }) {
  const { menus } = props;
  const theme = useTheme();
  const authValue = useRecoilValue(authState);

  return (
    <StyledHeader theme={theme}>
      <img src={Logo.src} alt="어쩌다보니비건 로고" width={165} height={24} />
      <Menu>
        {menus.map((item) => {
          return (
            <Link href={item?.route} key={item.route}>
              <MenuItem>{item?.name}</MenuItem>
            </Link>
          );
        })}
        {authValue?.id && <UserProfileBox />}
      </Menu>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  height: 70px;
  width: calc(100% - 96px);
  background: ${(p) => p.theme.palette.colors.primary[50]};
  display: flex;
  align-items: center;
  padding: 0px 48px;
`;

const Menu = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  gap: 28px;
`;

const MenuItem = styled.div`
  ${(p) => p.theme.typography.body2}
  ${(p) => p.theme.typography.weightBold}
  color: ${(p) => p.theme.palette.colors.basic.black};
  cursor: pointer;
`;
