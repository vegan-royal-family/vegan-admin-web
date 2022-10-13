import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { css, useTheme } from "@emotion/react";

export default function Chip({ size = "md", active = false, children }) {
  const theme = useTheme();

  const SIZES = {
    sm: css`
      --chip-padding: 2px 8px;
      --chip-font-size: ${theme.typography.body4};
    `,
    md: css`
      --chip-padding: 8px 12px;
      --chip-font-size: ${theme.typography.body3};
    `,
  };
  // TODO: font 적용 어뜨케 하지..
  const sizeStyle = SIZES[size];
  return (
    <StyledChip theme={theme} active={active} sizeStyle={sizeStyle}>
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
    background: ${(p) => p.theme.palette.colors.primary[100]};
    color: ${(p) => p.theme.palette.colors.gray[600]};
  }
`;
