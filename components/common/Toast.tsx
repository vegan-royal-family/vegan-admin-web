import styled from "@emotion/styled";
import { css, SerializedStyles, useTheme } from "@emotion/react";
import { ReactNode, ReactElement, useEffect } from "react";
import {
  fadeoutToRightAnimation,
  fadeinFromRightAnimation,
} from "styles/animation";
import Icon from "components/common/Icon";

const StyledToast = styled.div<{ typeStyle: SerializedStyles }>`
  visibility: visible;
  position: fixed;
  z-index: 1;
  right: 30px;
  top: 30px;
  width: 328px;
  box-shadow: 0px 2px 8px rgba(15, 23, 42, 0.25);
  border-radius: 10px;
  padding: 18px;
  background-color: #fff;
  color: #fff;

  display: flex;
  flex-direction: column;
  .title {
    display: flex;
    align-items: center;
    ${(props) => props.theme.typography.body3}
    font-weight: 500;
    .content {
      padding-left: 6px;
    }
  }
  .desc {
    ${(props) => props.theme.typography.body4}
    margin-top: 8px;
    font-weight: 400;
    color: ${(props) => props.theme.palette.colors.gray[400]};
  }

  // each type's style
  ${(props) => (props.typeStyle ? props.typeStyle : "")}

  // fadein, fadeout animation
  ${fadeinFromRightAnimation}
  ${fadeoutToRightAnimation}
  -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s forwards;
  animation: fadein 0.5s, fadeout 0.5s 2.5s forwards;
`;

// TODO: css 모듈에 theme 적용하는 법 찾아서 적용하기
const infoStyle = css`
  background-color: #232f46; //Gray/Gray-800
  color: #fff;
  padding: 16px;
`;

const successStyle = css`
  background-color: #fff;
  color: #31d834; //Success/Success-500
  border: 1px solid #31d834; //Success/Success-500
  .desc {
    margin-top: 6px;
  }
  svg > path {
    fill: #31d834;
  }
`;

const errorStyle = css`
  background-color: #fff;
  color: #ff5667; //Danger/Danger-500
  border: 1px solid #ff5667; //Danger/Danger-500
  .desc {
    margin-top: 6px;
  }
  svg > path {
    fill: #ff5667;
  }
`;

type ToastProps = {
  type: string;
  title: string;
  desc: string;
  onClose: Function;
};

export default function Toast(props: ToastProps): ReactElement {
  const theme = useTheme();
  const { type = "info", title = "", desc = "", onClose } = props;

  let titleContent: ReactNode = title;
  let typeStyle: SerializedStyles;
  switch (type) {
    case "info":
      typeStyle = infoStyle;
      break;
    case "success":
      titleContent = (
        <>
          <Icon icon="check-one" size="sm" />
          <span className="content">{title}</span>
        </>
      );
      typeStyle = successStyle;
      break;
    case "error":
      titleContent = (
        <>
          <Icon icon="attention" size="sm" />
          <span className="content">{title}</span>
        </>
      );
      typeStyle = errorStyle;
      break;
    default:
      break;
  }

  useEffect(() => {
    setTimeout(() => {
      onClose();
    }, 3000);
  }, []);

  return (
    <StyledToast theme={theme} typeStyle={typeStyle}>
      <div className="title">{titleContent}</div>
      {desc && <span className="desc">{desc}</span>}
    </StyledToast>
  );
}
