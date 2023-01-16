import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { MouseEvent, useEffect, useState } from "react";
import Icon from "components/common/Icon";

type CheckboxPropsType = {
  id: string;
  label?: string;
  disabled?: boolean;
  checked?: boolean;
  onChange?: (e: MouseEvent<HTMLInputElement>) => void;
};

export default function Checkbox({
  id,
  label = "",
  disabled = false,
  checked,
  onChange,
}: CheckboxPropsType) {
  const theme = useTheme();
  const [inputRef, setRef] = useState<HTMLInputElement>();

  useEffect(() => {
    if (inputRef) {
      inputRef.checked = checked;
    }
  }, [inputRef, checked]);

  return (
    <CheckboxWrapper theme={theme}>
      <input
        disabled={disabled}
        ref={(ref) => {
          setRef(ref);
        }}
        type="checkbox"
        id={id}
        name={id}
        onClick={onChange}
        hidden
      />
      <label className="custom-checkbox-box" htmlFor={id}>
        <Icon icon="checked" size="xs" />
      </label>
      {label && (
        <label htmlFor={id} className="custom-checkbox-label">
          {label}
        </label>
      )}
    </CheckboxWrapper>
  );
}

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  .custom-checkbox-box {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    background-color: transparent;
    border: 1px solid ${(p) => p.theme.palette.colors.gray[500]};
    box-sizing: border-box;
    border-radius: 5px;
    svg {
      transform: translateZ(0);
      width: 14px;
      height: 14px;
      color: white;
      opacity: 0;
      visibility: hidden;
    }
  }

  input:checked ~ .custom-checkbox-box {
    border: none;
    background-color: ${(p) => p.theme.palette.colors.primary[500]};
    svg {
      opacity: 1;
      visibility: visible;
    }
  }

  input:disabled {
    &:checked {
      & ~ .custom-checkbox-box {
        background-color: ${(p) => p.theme.palette.colors.gray[300]};
      }
    }
    &:not(:checked) {
      & ~ .custom-checkbox-box {
        border: 1px solid ${(p) => p.theme.palette.colors.gray[300]};
      }
    }
  }

  .custom-checkbox-label {
    ${(p) => p.theme.typography.body3}
    margin-left: 10px;
    cursor: pointer;
    user-select: none;
  }
`;
