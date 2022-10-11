import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { css, useTheme } from "@emotion/react";

export default function Button({
  type = "primary",
  size = "medium",
  label,
  disabled,
  width,
  children,
  ...props
}) {
  const theme = useTheme();
  const COLORS = {
    primary: css`
      --button-bg-color: ${theme.palette.colors.primary[500]};
      --button-hover-color: ${theme.palette.colors.primary[600]};
      --button-loading-color: ${theme.palette.colors.primary[400]};
      --button-disabled-color: ${theme.palette.colors.primary[100]};
      --button-font-color: ${theme.palette.colors.basic["white"]};
      --button-loading-font-color: ${theme.palette.colors.basic["white"]};
      --button-disabled-font-color: ${theme.palette.colors.primary[200]};
    `,
    secondary: css`
      --button-bg-color: ${theme.palette.colors.gray[200]};
      --button-hover-color: ${theme.palette.colors.gray[300]};
      --button-loading-color: ${theme.palette.colors.gray[200]};
      --button-disabled-color: ${theme.palette.colors.gray[200]};
      --button-font-color: ${theme.palette.colors.gray[900]};
      --button-loading-font-color: ${theme.palette.colors.gray[600]};
      --button-disabled-font-color: ${theme.palette.colors.gray[400]};
    `,
  };

  const SIZES = {
    sm: css`
      --button-size-height: 36px;
      --button-padding: 6px 16px;
      --button-radius: 25px;
    `,
    md: css`
      --button-size-height: 44px;
      --button-padding: 10px 24px;
      --button-radius: 25px;
    `,
    lg: css`
      --button-size-height: 56px;
      --button-padding: 16px 24px;
      --button-radius: 30px;
    `,
  };

  const colorStyle = COLORS[type];
  const sizeStyle = SIZES[size];

  return (
    <StyledButton
      type={type}
      size={size}
      disabled={disabled}
      colorStyle={colorStyle}
      sizeStyle={sizeStyle}
    >
      {label ?? children}
    </StyledButton>
  );
}

Button.propTypes = {
  type: PropTypes.oneOf(["primary", "secondary", "tertiary"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  label: PropTypes.string,
  disabled: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

const StyledButton = styled.button`
  ${(p) => p.colorStyle}
  ${(p) => p.sizeStyle}

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: var(--button-padding);
  height: var(--button-size-height);
  border: none;
  border-radius: var(--button-radius);
  background: var(--button-bg-color);
  color: var(--button-font-color);

  &:hover {
    background: var(--button-hover-color);
    color: var(--button-font-color);
  }

  &:disabled {
    background: var(--button-disabled-color);
    color: var(--button-disabled-font-color);
  }
`;
