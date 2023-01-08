import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";

export default function Footer() {
  const theme = useTheme();
  return (
    <StyledFooter theme={theme}>
      Tel. 042-000-0000 | 메일주소@gmail.com
      <br />
      대전 아무리 쳐다봐동 예쁘지호 304
      <br />
      <br />© 2022 royalfamily. All Rights Reserved.
    </StyledFooter>
  );
}

const StyledFooter = styled.footer`
  height: 192px;
  width: 100%;
  position: fixed;
  bottom: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background: ${(p) => p.theme.palette.colors.gray[200]};
  color: ${(p) => p.theme.palette.colors.basic.black};

  text-align: center;

  ${(p) => p.theme.typography.body4}
  ${(p) => p.theme.typography.weightRegular}
`;
