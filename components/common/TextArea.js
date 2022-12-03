import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { css, useTheme } from "@emotion/react";

export default function TextArea({
  value,
  onChange,
  placeholder = "필드를 입력해주세요.",
  width,
  height,
  ...props
}) {
  const theme = useTheme();

  return (
    <StyledTextArea
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      theme={theme}
      style={{ width, height }}
      {...props}
    />
  );
}

TextArea.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

const StyledTextArea = styled.textarea`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 16px;

  background: ${(p) => p.theme.palette.colors.basic.white};
  border: 1px solid ${(p) => p.theme.palette.colors.gray[300]};
  border-radius: 5px;

  resize: none;

  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  ::placeholder {
    color: ${(p) => p.theme.palette.colors.gray[400]};
  }
  &:focus {
    border: 1px solid ${(p) => p.theme.palette.colors.gray[500]};
    outline: none;
  }
`;
