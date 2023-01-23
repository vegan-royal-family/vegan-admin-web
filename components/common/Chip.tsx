import { PropsWithChildren } from "react";
import styled from "@emotion/styled";
import { css, SerializedStyles } from "@emotion/react";
import theme from "styles/theme";

type ChipPropsType = {
  size: "sm" | "md";
  active: boolean;
};

export default function Chip({
  size = "md",
  active = false,
  children,
}: PropsWithChildren<ChipPropsType>) {
  const typography = {
    sm: theme.typography.body4,
    md: theme.typography.body3,
  };
  const sizeStyle = SIZES[size];

  return (
    <StyledChip
      active={active}
      sizeStyle={sizeStyle}
      typography={typography[size]}
    >
      {children}
    </StyledChip>
  );
}

const SIZES = {
  sm: css`
    --chip-padding: 2px 8px;
  `,
  md: css`
    --chip-padding: 8px 12px;
  `,
};

const StyledChip = styled.div<{
  sizeStyle: SerializedStyles;
  typography: SerializedStyles;
  active: boolean;
}>`
  ${(p) => p.sizeStyle}
  ${(p) => p.typography}

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: var(--chip-padding);
  gap: 4px;
  border-radius: 15.5px;

  ${theme.typography.weightMedium};

  color: ${(p) =>
    p.active
      ? theme.palette.colors.basic["white"]
      : theme.palette.colors.gray[500]};

  background: ${(p) =>
    p.active
      ? theme.palette.colors.primary[500]
      : theme.palette.colors.gray[200]};
  &:hover {
    color: ${(p) =>
      p.active
        ? theme.palette.colors.basic["white"]
        : theme.palette.colors.gray[600]};
    background: ${(p) =>
      p.active
        ? theme.palette.colors.primary[500]
        : theme.palette.colors.primary[100]};
  }
`;
