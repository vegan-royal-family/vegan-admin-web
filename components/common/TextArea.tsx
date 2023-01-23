import { ChangeEvent } from "react";
import styled from "@emotion/styled";
import theme from "styles/theme";

type TextAreaPropsType = {
  id?: string;
  className?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => any;
  placeholder?: string;
  width?: string | number;
  height?: string | number;
  helpText?: string;
  label?: string;
  readOnly?: boolean;
};

export default function TextArea({
  value,
  placeholder = "필드를 입력해주세요.",
  width,
  height,
  label,
  helpText,
  ...props
}: TextAreaPropsType) {
  return (
    <LabelField>
      {label && <div className="label">{label}</div>}
      <StyledTextArea
        placeholder={placeholder}
        value={value}
        style={{ width, height }}
        {...props}
      />
      {helpText && <div className="helpText">{helpText}</div>}
    </LabelField>
  );
}

const LabelField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  .label {
    ${theme.typography.body3}
    ${theme.typography.weightMedium}
     color: ${theme.palette.colors.basic.black}
  }
  .helpText {
    ${theme.typography.body4}
    ${theme.typography.weightRegular}
    color: ${theme.palette.colors.gray[400]};
    text-align: right;
  }
`;

const StyledTextArea = styled.textarea`
  ${theme.typography.body3}
  ${theme.typography.weightRegular}
  
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 16px;

  background: ${theme.palette.colors.basic.white};
  border: 1px solid ${theme.palette.colors.gray[300]};
  border-radius: 5px;
  box-sizing: border-box;

  resize: none;

  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  ::placeholder {
    color: ${theme.palette.colors.gray[400]};
  }
  &:focus {
    border: 1px solid ${theme.palette.colors.gray[500]};
    outline: none;
  }
`;
