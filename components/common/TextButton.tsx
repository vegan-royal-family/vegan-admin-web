import { PropsWithChildren } from "react";
import styled from "@emotion/styled";
import { css, SerializedStyles } from "@emotion/react";
import theme from "styles/theme";

type TextButtonPropsType = {
  id?: string;
  className?: string;
  type?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  label?: string;
  disabled?: boolean;
};

export default function TextButton({
  type = "primary",
  size = "md",
  label,
  children,
  ...props
}: PropsWithChildren<TextButtonPropsType>) {
  const colorStyle = COLORS[type];
  const sizeStyle = SIZES[size];

  return (
    <StyledTextButton
      colorStyle={colorStyle}
      sizeStyle={sizeStyle}
      typography={typography[size]}
      {...props}
    >
      {label ?? children}
    </StyledTextButton>
  );
}

const COLORS = {
  primary: css`
    --button-font-color: ${theme.palette.colors.primary[500]};
    --button-hover-color: ${theme.palette.colors.primary[600]};
    --button-disabled-color: ${theme.palette.colors.primary[200]};
  `,
  secondary: css`
    --button-font-color: ${theme.palette.colors.gray[600]};
    --button-hover-color: ${theme.palette.colors.primary[600]};
    --button-disabled-color: ${theme.palette.colors.gray[400]};
  `,
};
const SIZES = {
  sm: css`
    --button-height: 16px;
    --button-gap: 6px;
  `,
  md: css`
    --button-height: 20px;
    --button-gap: 8px;
  `,
  lg: css`
    --button-height: 24px;
    --button-gap: 8px;
  `,
};
const typography = {
  sm: theme.typography.body4,
  md: theme.typography.body3,
  lg: theme.typography.body2,
};

const StyledTextButton = styled.button<{
  colorStyle: SerializedStyles;
  sizeStyle: SerializedStyles;
  typography: SerializedStyles;
}>`
  ${(p) => p.colorStyle}
  ${(p) => p.sizeStyle}
  ${(p) => p.typography}
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  border: none;
  padding: 0;
  background: transparent;

  gap: var(--button-gap);
  height: var(--button-height);

  ${theme.typography.weightBold};

  color: var(--button-font-color);
  &:hover {
    color: var(--button-hover-color);
  }
  &:disabled {
    color: var(--button-disabled-color);
  }
`;
