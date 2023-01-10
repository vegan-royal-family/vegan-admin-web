import { MouseEvent, PropsWithChildren } from "react";
import { keyframes, useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import Button from "components/common/Button";
import PerfectScrollbar from "react-perfect-scrollbar";

type RightSheetPropsType = {
  visible?: boolean;
  title?: string;
  onClose?: (e: MouseEvent<HTMLButtonElement>) => any;
};

export default function RightSheet({
  children,
  visible,
  title,
  onClose,
}: PropsWithChildren<RightSheetPropsType>) {
  const theme = useTheme();

  return (
    <Overlay>
      <StyledPopup visible={visible} theme={theme}>
        {title && <TitleBox>{title}</TitleBox>}
        <PerfectScrollbar>
          <Content theme={theme}>{children}</Content>
        </PerfectScrollbar>
        {typeof onClose === "function" && (
          <ButtonBox>
            <Button type="secondary" size="md" onClick={onClose}>
              닫기
            </Button>
          </ButtonBox>
        )}
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

const TitleBox = styled.div`
  ${(p) => p.theme.typography.body2}
  ${(p) => p.theme.typography.weightBold}
  
  color: ${(p) => p.theme.palette.colors.basic.black};
  text-align: left;
  padding: 40px 32px;
`;

const Content = styled.div`
  padding: 0px;
  width: 100%;
  //flex: 1;
  padding: 0 32px;
  box-sizing: border-box;
  overflow-y: auto;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  box-sizing: border-box;
  padding: 24px 32px 40px;
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

  padding: 0 32px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
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
