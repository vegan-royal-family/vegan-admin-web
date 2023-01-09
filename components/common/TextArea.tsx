import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import { ChangeEvent } from "react";

type TextAreaPropsType = {
  id?: string;
  className?: string;
  value?: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => any;
  placeholder?: string;
  width?: string | number;
  height?: string | number;
  helpText?: string;
  label?: string;
};

export default function TextArea({
  value,
  onChange,
  placeholder = "필드를 입력해주세요.",
  width,
  height,
  label,
  helpText,
  ...props
}: TextAreaPropsType) {
  const theme = useTheme();

  return (
    <LabelField theme={theme}>
      {label && <div className="label">{label}</div>}
      <StyledTextArea
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        theme={theme}
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
    ${(p) => p.theme.typography.body3}
    ${(p) => p.theme.typography.weightMedium}
     color: ${(p) => p.theme.palette.colors.basic.black}
  }
  .helpText {
    ${(p) => p.theme.typography.body4}
    ${(p) => p.theme.typography.weightRegular}
    color: ${(p) => p.theme.palette.colors.gray[400]};
    text-align: right;
  }
`;

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
