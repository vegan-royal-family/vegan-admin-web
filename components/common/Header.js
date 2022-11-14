import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import Logo from "assets/Logo/Logo.png";

export default function Header() {
  const theme = useTheme();
  return (
    <StyledHeader theme={theme}>
      <img src={Logo.src} alt={"어쩌다보니비건 로고"} width={200} height={28} />
      <Menu>
        <MenuItem>채식 식당 관리</MenuItem>
        <MenuItem>채식 레시피 관리</MenuItem>
        <MenuItem>회원 관리</MenuItem>
        <MenuItem>운영자 관리</MenuItem>
        <LoginButton>로그인</LoginButton>
      </Menu>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  height: 80px;
  width: calc(100% - 96px);

  background: ${(p) => p.theme.palette.colors.primary[50]};

  display: flex;
  align-items: center;
  padding: 0px 48px;
`;

const Menu = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  gap: 32px;
`;

const MenuItem = styled.div`
  ${(p) => p.theme.typography.body1}
  ${(p) => p.theme.typography.weightBold}
  color: ${(p) => p.theme.palette.colors.basic.black}
`;

const LoginButton = styled.button`
  margin-left: 26px;
`;
