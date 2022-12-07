import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { css, useTheme } from "@emotion/react";

export default function Input({
  value,
  onChange,
  placeholder = "필드를 입력해주세요.",
  width,
  height,
  label,
  disabled = false,
  helpText,
  ...props
}) {
  const theme = useTheme();
  return (
    <LabelField theme={theme} disabled={disabled}>
      {label && <div className="label">{label}</div>}
      <StyledInput
        type={"text"}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        theme={theme}
        style={{ width, height }}
        disabled={disabled}
        {...props}
      />
      {helpText && <div className="helpText">{helpText}</div>}
    </LabelField>
  );
}

Input.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string,
  disabled: PropTypes.bool,
  helpText: PropTypes.string,
};

const LabelField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  .label {
    ${(p) => p.theme.typography.body3}
    ${(p) => p.theme.typography.weightMedium}
     color: ${(p) =>
      p.disabled ? p.theme.palette.colors.gray[300] : p.theme.palette.colors.basic.black}
  }
  .helpText {
    ${(p) => p.theme.typography.body4}
    ${(p) => p.theme.typography.weightRegular}
    color: ${(p) =>
      p.disabled ? p.theme.palette.colors.gray[300] : p.theme.palette.colors.gray[500]};
  }
`;

const StyledInput = styled.input`
  ${(p) => p.theme.typography.body2}
  ${(p) => p.theme.typography.weightRegular}

  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  display: flex;
  align-items: center;
  padding: 10px 16px;
  border: 1px solid ${(p) => p.theme.palette.colors.gray[300]};
  border-radius: 5px;
  color: ${(p) => p.theme.palette.colors.basic.black};

  ::placeholder {
    color: ${(p) => p.theme.palette.colors.gray[400]};
  }
  &:focus {
    border: 1px solid ${(p) => p.theme.palette.colors.gray[500]};
    outline: none;
  }

  :disabled {
    background-color: ${(p) => p.theme.palette.colors.gray[50]};
    border: 1px solid ${(p) => p.theme.palette.colors.gray[200]};
    color: ${(p) => p.theme.palette.colors.gray[400]};
  }
`;
