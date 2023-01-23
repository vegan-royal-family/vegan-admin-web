import { ReactNode, ReactElement, useEffect } from "react";
import styled from "@emotion/styled";
import { css, SerializedStyles } from "@emotion/react";
import theme from "styles/theme";
import {
  fadeoutToRightAnimation,
  fadeinFromRightAnimation,
} from "styles/animation";
import Icon from "components/common/Icon";

type ToastPropsType = {
  type: "info" | "success" | "error";
  title: string;
  desc?: string;
  onClose: Function;
};

export default function Toast(props: ToastPropsType): ReactElement {
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
    }, 2500);
  }, []);

  return (
    <StyledToast typeStyle={typeStyle}>
      <div className="title">{titleContent}</div>
      {desc && <span className="desc">{desc}</span>}
    </StyledToast>
  );
}

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
  background-color: ${theme.palette.colors.basic["white"]};
  color: ${theme.palette.colors.basic["white"]};

  display: flex;
  flex-direction: column;
  .title {
    display: flex;
    align-items: center;
    ${theme.typography.body3}
    font-weight: 500;
    .content {
      padding-left: 6px;
    }
  }
  .desc {
    ${theme.typography.body4}
    margin-top: 8px;
    font-weight: 400;
    color: ${theme.palette.colors.gray[400]};
  }

  // each type's style
  ${(props) => (props.typeStyle ? props.typeStyle : "")}

  // fadein, fadeout animation
  ${fadeinFromRightAnimation}
  ${fadeoutToRightAnimation}
  -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s forwards;
  animation: fadein 0.5s, fadeout 0.5s 2.5s forwards;
`;

const infoStyle = css`
  background-color: ${theme.palette.colors.gray[800]};
  color: ${theme.palette.colors.basic["white"]};
  padding: 16px;
`;

const successStyle = css`
  background-color: ${theme.palette.colors.basic["white"]};
  color: ${theme.palette.status.success[500]};
  border: 1px solid ${theme.palette.status.success[500]};
  .desc {
    margin-top: 6px;
  }
  svg > path {
    fill: ${theme.palette.status.success[500]};
  }
`;

const errorStyle = css`
  background-color: ${theme.palette.colors.basic["white"]};
  color: ${theme.palette.status.danger[500]};
  border: 1px solid ${theme.palette.status.danger[500]};
  .desc {
    margin-top: 6px;
  }
  svg > path {
    fill: ${theme.palette.status.danger[500]};
  }
`;
