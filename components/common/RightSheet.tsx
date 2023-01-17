import { MouseEvent, PropsWithChildren } from "react";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import Button from "components/common/Button";
import PerfectScrollbar from "react-perfect-scrollbar";
import theme from "styles/theme";
import { ModalPortal } from "components/common/Portal";

type RightSheetPropsType = {
  visible?: boolean;
  title?: string;
  onClose?: (e: MouseEvent<HTMLButtonElement>) => any;
  onSave?: (e: MouseEvent<HTMLButtonElement>) => any;
  closeButtonText?: string;
  saveButtonText?: string;
};

export default function RightSheet({
  children,
  visible,
  title,
  onClose,
  onSave,
  closeButtonText = "취소",
  saveButtonText = "저장",
}: PropsWithChildren<RightSheetPropsType>) {
  return (
    <ModalPortal>
      <Overlay>
        <StyledPopup visible={visible}>
          {title && <TitleBox>{title}</TitleBox>}
          <PerfectScrollbar>
            <Content>{children}</Content>
          </PerfectScrollbar>
          <ButtonBox>
            {onSave && (
              <Button
                type="primary"
                size="md"
                onClick={onSave}
                style={{ marginRight: 14 }}
              >
                {saveButtonText}
              </Button>
            )}
            {onClose && (
              <Button type="secondary" size="md" onClick={onClose}>
                {closeButtonText}
              </Button>
            )}
          </ButtonBox>
        </StyledPopup>
      </Overlay>
    </ModalPortal>
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
  ${theme.typography.body1}
  ${theme.typography.weightBold}
  
  color: ${theme.palette.colors.basic.black};
  text-align: left;
  padding: 40px 32px;
`;

const Content = styled.div`
  padding: 0px;
  width: 100%;
  height: 100%;
  //flex: 1;
  padding: 0 32px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
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
  background: ${theme.palette.colors.basic.white};
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
