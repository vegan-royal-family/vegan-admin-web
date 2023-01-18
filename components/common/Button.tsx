import { MouseEvent, PropsWithChildren, ReactNode } from "react";
import styled from "@emotion/styled";
import { css, SerializedStyles } from "@emotion/react";
import theme from "styles/theme";
import CircleSpinner from "./Spinner";

type ButtonProps = {
  id?: string;
  className?: string;
  type?: "primary" | "secondary" | "tertiary";
  size?: "sm" | "md" | "lg";
  label?: string;
  loading?: boolean;
  disabled?: boolean;
  width?: string | number;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => any;
  style?: any;
  prefixContent?: ReactNode;
  suffixContent?: ReactNode;
};

export default function Button({
  type = "primary",
  size = "md",
  label,
  loading = false,
  disabled,
  width,
  children,
  prefixContent,
  suffixContent,
  ...props
}: PropsWithChildren<ButtonProps>) {
  const colorStyle = COLORS[type];
  const sizeStyle = SIZES[size];

  const spinnerColor = {
    firstColor: type === "primary" ? null : "#64748B",
    secondColor: type === "primary" ? null : "#64748B",
  };

  return (
    <StyledButton
      type="button"
      disabled={disabled || loading}
      colorStyle={colorStyle}
      sizeStyle={sizeStyle}
      theme={theme}
      loading={loading}
      {...props}
    >
      {loading ? (
        <>
          <span>{label ?? children}</span>
          <CircleSpinner size="16px" {...spinnerColor} />
        </>
      ) : (
        <>
          {prefixContent}
          {label ?? children}
          {suffixContent}
        </>
      )}
    </StyledButton>
  );
}

const COLORS = {
  primary: css`
    --button-bg-color: ${theme.palette.colors.primary[500]};
    --button-border-style: none;
    --button-hover-color: ${theme.palette.colors.primary[600]};
    --button-loading-color: ${theme.palette.colors.primary[400]};
    --button-disabled-color: ${theme.palette.colors.primary[100]};
    --button-font-color: ${theme.palette.colors.basic["white"]};
    --button-loading-font-color: ${theme.palette.colors.basic["white"]};
    --button-disabled-font-color: ${theme.palette.colors.primary[200]};
  `,
  secondary: css`
    --button-bg-color: ${theme.palette.colors.gray[200]};
    --button-border-style: none;
    --button-hover-color: ${theme.palette.colors.gray[300]};
    --button-loading-color: ${theme.palette.colors.gray[200]};
    --button-disabled-color: ${theme.palette.colors.gray[200]};
    --button-font-color: ${theme.palette.colors.gray[900]};
    --button-loading-font-color: ${theme.palette.colors.gray[600]};
    --button-disabled-font-color: ${theme.palette.colors.gray[400]};
  `,
  tertiary: css`
    --button-bg-color: ${theme.palette.colors.basic["white"]};
    --button-border-style: 1px solid ${theme.palette.colors.gray[300]};
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
  loading: boolean;
  colorStyle: SerializedStyles;
  sizeStyle: SerializedStyles;
}>`
  ${(p) => p.colorStyle}
  ${(p) => p.sizeStyle}

  display: flex;
  align-items: center;
  cursor: ${(p) => (p.disabled ? `default` : `pointer`)};

  ${theme.typography.weightBold};
  ${theme.typography.body3};

  gap: var(--button-gap);
  padding: var(--button-padding);
  height: var(--button-size-height);
  border: var(--button-border-style);
  border-radius: var(--button-radius);
  background: var(--button-bg-color);
  color: var(--button-font-color);

  &:hover {
    background: var(--button-hover-color);
    color: var(--button-font-color);
  }

  &:disabled {
    background: var(
      ${(p) =>
        p.loading ? "--button-loading-color" : "--button-disabled-color"}
    );
    color: var(
      ${(p) =>
        p.loading ? "--button-font-color" : "--button-disabled-font-color"}
    );
  }

  svg > path {
    fill: var(--button-font-color);
  }
`;
