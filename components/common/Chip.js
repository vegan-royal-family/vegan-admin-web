import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { css, useTheme } from "@emotion/react";

export default function Chip({ size = "md", active = false, children }) {
  const theme = useTheme();

  const SIZES = {
    sm: css`
      --chip-padding: 2px 8px;
    `,
    md: css`
      --chip-padding: 8px 12px;
    `,
  };

  const typography = {
    sm: theme.typography.body4,
    md: theme.typography.body3,
  };

  const sizeStyle = SIZES[size];
  return (
    <StyledChip
      theme={theme}
      active={active}
      sizeStyle={sizeStyle}
      typography={typography[size]}
    >
      {children}
    </StyledChip>
  );
}

Chip.propTypes = {
  size: PropTypes.oneOf(["sm", "md"]),
  active: PropTypes.bool,
};

const StyledChip = styled.div`
  ${(p) => p.sizeStyle}
  ${(p) => p.typography}

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: var(--chip-padding);
  gap: 4px;
  border-radius: 15.5px;

  ${(p) => p.theme.typography.weightMedium};

  color: ${(p) =>
    p.active ? p.theme.palette.colors.basic["white"] : p.theme.palette.colors.gray[500]};

  background: ${(p) =>
    p.active ? p.theme.palette.colors.primary[500] : p.theme.palette.colors.gray[200]};
  &:hover {
    color: ${(p) =>
      p.active
        ? p.theme.palette.colors.basic["white"]
        : p.theme.palette.colors.gray[600]};
    background: ${(p) =>
      p.active
        ? p.theme.palette.colors.primary[500]
        : p.theme.palette.colors.primary[100]};
  }
`;
