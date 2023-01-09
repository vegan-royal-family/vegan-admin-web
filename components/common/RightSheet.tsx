import { keyframes, useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { PropsWithChildren } from "react";

type RightSheetPropsType = {
  visible?: boolean;
  title?: string;
};

export default function RightSheet({
  children,
  visible,
  title,
}: PropsWithChildren<RightSheetPropsType>) {
  const theme = useTheme();

  return (
    <Overlay>
      <StyledPopup visible={visible} theme={theme}>
        <Container theme={theme}>
          {title && <div className="title">{title}</div>}
          {children}
        </Container>
      </StyledPopup>
    </Overlay>
  );
}

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  touch-action: none;
  z-index: 10;

  background: rgba(0, 0, 0, 0.4);
`;

const Container = styled.div`
  padding: 40px 100px;

  .title {
    ${(p) => p.theme.typography.body1}
    ${(p) => p.theme.typography.weightBold}
    
    color: ${(p) => p.theme.palette.colors.basic.black};
    margin-bottom: 62px;

    text-align: left;
  }
`;

const StyledPopup = styled.div<{ visible: boolean }>`
  position: absolute;
  top: 0;
  right: 0;

  width: 800px;
  height: 100%;

  background: ${(p) => p.theme.palette.colors.basic.white};
  animation: ${(p) => (p.visible ? fadeInLeft : fadeInRight)} 1s;

  box-shadow: 0 0 0 100vw rgba(0, 0, 0, 0.5);
  border-radius: 48px 0px 0px 48px;
`;

const TitleBox = styled.div`
  ${(p) => p.theme.typography.body1}
  ${(p) => p.theme.typography.weightBold}
  
  color: ${(p) => p.theme.palette.colors.basic.black};
  margin-bottom: 62px;

  text-align: left;
`;

const fadeInLeft = keyframes`
from {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
to {
  opacity: 1;
  transform: translateZ(0);
}
`;

const fadeInRight = keyframes`
from {
  opacity: 1;
  transform: translateZ(0);
}
to {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
`;
