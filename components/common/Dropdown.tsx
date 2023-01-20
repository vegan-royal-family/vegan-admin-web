import { ChangeEvent, ReactElement, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import theme from "styles/theme";
import { LabelField } from "./Input";
import { createPopper } from "@popperjs/core";

type DropdownTypes = {
  id?: string;
  className?: string;
  value?: number | string;
  options: Array<{ id?: string | number; name: string }>;
  onChange: (e: ChangeEvent<HTMLInputElement>) => any;
  placeholder?: string;
  width?: string | number;
  height?: string | number;
  label?: string;
  disabled?: boolean;
};

export default function Dropdown({
  id,
  className,
  value,
  options,
  onChange,
  placeholder = "필드를 입력해주세요.",
  width = "100%",
  height,
  label,
  disabled = false,
}: DropdownTypes) {
  const inputRef = useRef();
  const selectListRef = useRef();

  useEffect(() => {
    if (inputRef && selectListRef) {
      createPopper(inputRef?.current, selectListRef?.current, {
        placement: "bottom",
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [0, 10],
            },
          },
        ],
      });
    }
  }, [inputRef, selectListRef]);

  return (
    <div style={{ position: "relative", width }}>
      <LabelField disabled={disabled}>
        {label && <div className="label">{label}</div>}
        <StyledInput
          id={id}
          className={className}
          ref={inputRef}
          placeholder={placeholder}
          style={{ width, height }}
        >
          {value ?? placeholder}
        </StyledInput>
      </LabelField>
      <OptionListContainer ref={selectListRef} width={width}>
        {options.map((option) => {
          return <div className="option-item">{option.name}</div>;
        })}
      </OptionListContainer>
    </div>
  );
}

const OptionListContainer = styled.div<{ width: string | number }>`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  color: #643045;
  font-weight: bold;
  padding: 10px 16px;
  font-size: 13px;
  border-radius: 4px;
  border: 1px solid #000;
  box-sizing: border-box;
  width: ${(p) => p.width};
`;

const StyledInput = styled.div`
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
