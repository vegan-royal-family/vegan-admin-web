import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { css, useTheme } from "@emotion/react";

export default function Input({
  value,
  onChange,
  placeholder = "필드를 입력해주세요.",
  width,
  height,
  ...props
}) {
  const theme = useTheme();
  return (
    <StyledInput
      type={"text"}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      theme={theme}
      style={{ width, height }}
      {...props}
    />
  );
}

Input.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

const StyledInput = styled.input`
  ${(p) => p.theme.typography.body2}
  ${(p) => p.theme.typography.weightRegular}
  display: flex;
  align-items: center;
  padding: 16px;
  border: 1px solid ${(p) => p.theme.palette.colors.gray[300]};
  border-radius: 12px;
  ::placeholder {
    color: ${(p) => p.theme.palette.colors.gray[400]};
  }
  &:focus {
    outline: 1px solid var(--primary-1);
  }
`;
