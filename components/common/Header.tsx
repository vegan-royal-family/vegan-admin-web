import styled from "@emotion/styled";
import { useRouter } from "next/router";
import Link from "next/link";
import { useRecoilValueLoadable } from "recoil";
import { authSelector } from "states/auth";
import Image from "next/image";
import Logo from "assets/Logo/Logo.png";
import theme from "styles/theme";
import ProfileDropdown from "../mypage/ProfileDropdown";

type MenuType = Array<{ route: string; name: string }>;

export default function Header(props: { menus: MenuType }) {
  const { menus } = props;
  const router = useRouter();

  const authValueLoadable = useRecoilValueLoadable(authSelector);
  let authValue = null;
  switch (authValueLoadable.state) {
    case "hasValue":
      authValue = authValueLoadable.contents;
      break;
  }

  return (
    <StyledHeader>
      <Image src={Logo.src} alt="어쩌다보니비건 로고" width={165} height={24} />
      <MenuList>
        {menus.map((item) => {
          const isSelected = router.pathname.includes(item.route);
          return (
            <Link href={item?.route} key={item.route}>
              <MenuItem isSelected={isSelected}>{item?.name}</MenuItem>
            </Link>
          );
        })}
      </MenuList>
      {authValue?.userId && <ProfileDropdown authValue={authValue} />}
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  height: 70px;
  flex: 0 0 70px;
  width: calc(100% - 96px);
  background: ${theme.palette.colors.primary[50]};
  display: flex;
  align-items: center;
  padding: 0px 48px;
`;

const MenuList = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  gap: 28px;
`;

const MenuItem = styled.div<{ isSelected: boolean }>`
  ${theme.typography.body2}
  ${theme.typography.weightBold}
  
  cursor: pointer;
  user-select: none;
  &:hover {
    color: ${theme.palette.colors.primary[400]};
  }
  color: ${(p) =>
    p.isSelected
      ? `${theme.palette.colors.primary[500]}`
      : `${theme.palette.colors.basic.black}`};
`;
