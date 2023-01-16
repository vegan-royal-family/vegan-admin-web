import { MouseEvent, PropsWithChildren } from "react";
import styled from "@emotion/styled";
import { css, SerializedStyles } from "@emotion/react";
import theme from "styles/theme";

type ButtonProps = {
  id?: string;
  className?: string;
  type?: "primary" | "secondary" | "tertiary";
  size?: "sm" | "md" | "lg";
  label?: string;
  disabled?: boolean;
  width?: string | number;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => any;
  style?: any;
};

export default function Button({
  type = "primary",
  size = "md",
  label,
  disabled,
  width,
  children,
  ...props
}: PropsWithChildren<ButtonProps>) {
  const colorStyle = COLORS[type];
  const sizeStyle = SIZES[size];

  return (
    <StyledButton
      type="button"
      disabled={disabled}
      colorStyle={colorStyle}
      sizeStyle={sizeStyle}
      theme={theme}
      {...props}
    >
      {label ?? children}
    </StyledButton>
  );
}

const COLORS = {
  primary: css`
    --button-bg-color: ${theme.palette.colors.primary[500]};
    --button-border-color: ${theme.palette.colors.primary[500]};
    --button-hover-color: ${theme.palette.colors.primary[600]};
    --button-loading-color: ${theme.palette.colors.primary[400]};
    --button-disabled-color: ${theme.palette.colors.primary[100]};
    --button-font-color: ${theme.palette.colors.basic["white"]};
    --button-loading-font-color: ${theme.palette.colors.basic["white"]};
    --button-disabled-font-color: ${theme.palette.colors.primary[200]};
  `,
  secondary: css`
    --button-bg-color: ${theme.palette.colors.gray[200]};
    --button-border-color: ${theme.palette.colors.gray[200]};
    --button-hover-color: ${theme.palette.colors.gray[300]};
    --button-loading-color: ${theme.palette.colors.gray[200]};
    --button-disabled-color: ${theme.palette.colors.gray[200]};
    --button-font-color: ${theme.palette.colors.gray[900]};
    --button-loading-font-color: ${theme.palette.colors.gray[600]};
    --button-disabled-font-color: ${theme.palette.colors.gray[400]};
  `,
  tertiary: css`
    --button-bg-color: ${theme.palette.colors.basic["white"]};
    --button-border-color: ${theme.palette.colors.gray[300]};
    --button-hover-color: ${theme.palette.colors.gray[100]};
    --button-loading-color: ${theme.palette.colors.basic["white"]};
    --button-disabled-color: ${theme.palette.colors.basic["white"]};
    --button-font-color: ${theme.palette.colors.gray[900]};
    --button-loading-font-color: ${theme.palette.colors.gray[500]};
    --button-disabled-font-color: ${theme.palette.colors.gray[400]};
  `,
};

const SIZES = {
  sm: css`
    --button-size-height: 36px;
    --button-padding: 6px 16px;
    --button-radius: 25px;
    --button-gap: 6px;
  `,
  md: css`
    --button-size-height: 44px;
    --button-padding: 10px 24px;
    --button-radius: 25px;
    --button-gap: 8px;
  `,
  lg: css`
    --button-size-height: 56px;
    --button-padding: 16px 24px;
    --button-radius: 30px;
    --button-gap: 8px;
  `,
};

const StyledButton = styled.button<{
  colorStyle: SerializedStyles;
  sizeStyle: SerializedStyles;
}>`
  ${(p) => p.colorStyle}
  ${(p) => p.sizeStyle}

  display: flex;
  cursor: ${(p) => (p.disabled ? `default` : `pointer`)};

  ${theme.typography.weightBold};
  ${theme.typography.body3};

  gap: var(--button-gap);
  padding: var(--button-padding);
  height: var(--button-size-height);
  border: 1px solid var(--button-border-color);
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
