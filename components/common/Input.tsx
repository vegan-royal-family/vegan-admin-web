import { ChangeEvent, ReactElement } from "react";
import styled from "@emotion/styled";
import theme from "styles/theme";

type InputPropsType = {
  id?: string;
  className?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => any;
  placeholder?: string;
  width?: string | number;
  height?: string | number;
  label?: string;
  disabled?: boolean;
  readOnly?: boolean;
  helpText?: string;
};

export default function Input({
  id,
  className,
  value,
  onChange,
  placeholder = "필드를 입력해주세요.",
  width,
  height,
  label,
  disabled = false,
  readOnly = false,
  helpText,
}: InputPropsType): ReactElement {
  return (
    <LabelField disabled={disabled}>
      {label && <div className="label">{label}</div>}
      <StyledInput
        id={id}
        className={className}
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        style={{ width, height }}
        disabled={disabled}
        readOnly={readOnly}
      />
      {helpText && <div className="helpText">{helpText}</div>}
    </LabelField>
  );
}

export const LabelField = styled.div<{ disabled: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  .label {
    ${theme.typography.body3}
    ${theme.typography.weightMedium}
     color: ${(p) =>
      p.disabled
        ? theme.palette.colors.gray[300]
        : theme.palette.colors.basic.black}
  }
  .helpText {
    ${theme.typography.body4}
    ${theme.typography.weightRegular}
    color: ${(p) =>
      p.disabled
        ? theme.palette.colors.gray[300]
        : theme.palette.colors.gray[500]};
  }
`;

const StyledInput = styled.input`
  ${theme.typography.body3}
  ${theme.typography.weightRegular}

  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  display: flex;
  align-items: center;
  padding: 10px 16px;
  border: 1px solid ${theme.palette.colors.gray[300]};
  border-radius: 5px;
  color: ${theme.palette.colors.basic.black};
  box-sizing: border-box;

  ::placeholder {
    color: ${theme.palette.colors.gray[400]};
  }
  &:focus {
    border: 1px solid ${theme.palette.colors.gray[500]};
    outline: none;
  }

  :disabled {
    background-color: ${theme.palette.colors.gray[50]};
    border: 1px solid ${theme.palette.colors.gray[200]};
    color: ${theme.palette.colors.gray[400]};
  }
`;
