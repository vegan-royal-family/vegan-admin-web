import { useRef, useState } from "react";
import styled from "@emotion/styled";
import theme from "styles/theme";
import useOnClickOutside from "utils/useOnClickOutside";
import Icon from "./Icon";
import { css, SerializedStyles } from "@emotion/react";

type OptionType = {
  id: string | number;
  name: string;
};

type DropdownTypes = {
  id?: string;
  className?: string;
  defaultValueId?: number | string;
  options: Array<OptionType>;
  onChange: (option: OptionType) => void;
  placeholder?: string;
  width?: string | number;
  height?: string | number;
  label?: string;
  disabled?: boolean;
};

export default function Dropdown({
  id,
  className,
  defaultValueId,
  options,
  onChange,
  placeholder = "필드를 입력해주세요.",
  width = "100%",
  height,
  label,
  disabled = false,
}: DropdownTypes) {
  const clickOutsideRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(defaultValueId);

  useOnClickOutside(clickOutsideRef, () => setIsOpen(false));

  return (
    <div className="custom-dropdown-input" style={{ width }}>
      {label && <Label className="label">{label}</Label>}
      <div ref={clickOutsideRef} style={{ position: "relative", width }}>
        <StyledInput
          id={id}
          className={className}
          placeholder={placeholder}
          width={width}
          height={height}
          onClick={() => {
            setIsOpen((value) => !value);
          }}
        >
          {selectedId ? (
            <span className="selected-item">
              {options.filter((item) => item.id === selectedId)[0]?.name}
            </span>
          ) : (
            <span className="placeholder">{placeholder}</span>
          )}
          <Icon icon={isOpen ? "up" : "down"} size="sm" />
        </StyledInput>
        {isOpen && (
          <OptionListContainer
            width={width}
            animation={isOpen ? openAnimation : closeAnimation}
          >
            <ul>
              {options.map((option) => {
                const isSelected = option.id === selectedId;
                return (
                  <li
                    className={
                      isSelected ? "selected-option-item" : "option-item"
                    }
                    onClick={() => {
                      onChange(option);
                      setSelectedId(option.id);
                      setIsOpen(false);
                    }}
                  >
                    {option.name}
                  </li>
                );
              })}
            </ul>
          </OptionListContainer>
        )}
      </div>
    </div>
  );
}

const openAnimation = css`
  @keyframes scaleUp {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  animation: scaleUp 200ms ease-in-out forwards;
  visibility: visible;
`;

const closeAnimation = css`
  @keyframes scaleDown {
    0% {
      visibility: visible;
      transform: scale(1);
    }
    100% {
      visibility: hidden;
      transform: scale(0);
    }
  }
  animation: scaleDown 200ms ease-in-out forwards;
`;

const Label = styled.div<{ disabled?: boolean }>`
  ${theme.typography.body3}
  ${theme.typography.weightMedium}

  display: inline-block;
  color: ${(p) =>
    p.disabled
      ? theme.palette.colors.gray[300]
      : theme.palette.colors.basic.black};
  margin-bottom: 8px;
`;

const StyledInput = styled.div<{
  width?: string | number;
  height?: string | number;
}>`
  ${theme.typography.body3}
  ${theme.typography.weightRegular}

  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
  border: 1px solid ${theme.palette.colors.gray[300]};
  border-radius: 5px;
  color: ${theme.palette.colors.basic.black};
  box-sizing: border-box;
  width: ${(p) => p.width};
  height: ${(p) => p.height};
  cursor: pointer;
  user-select: none;

  &:hover {
    border: 1px solid ${theme.palette.colors.gray[500]};
  }

  .placeholder {
    color: ${theme.palette.colors.gray[400]};
  }

  /* .disabled {
    background-color: ${theme.palette.colors.gray[50]};
    border: 1px solid ${theme.palette.colors.gray[200]};
    color: ${theme.palette.colors.gray[400]};
  } */
`;

const OptionListContainer = styled.div<{
  width: string | number;
  animation: SerializedStyles;
}>`
  ${theme.typography.body3}
  ${theme.typography.weightMedium}

  visibility: hidden;
  position: absolute;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: 5px;
  box-sizing: border-box;
  margin-top: 4px;
  box-shadow: rgb(0 0 0 / 20%) 0px 5px 5px -3px,
    rgb(0 0 0 / 14%) 0px 8px 10px 1px, rgb(0 0 0 / 12%) 0px 3px 14px 2px;
  width: ${(p) => p.width};
  ${(p) => p.animation}

  ul {
    padding: 0;
    margin: 0;
    & > li:first-child {
      border-radius: 5px 5px 0 0;
    }
    & > li:last-child {
      border-radius: 0 0 5px 5px;
    }

    li {
      background: #fff;
      padding: 12px 20px;
      cursor: pointer;
      user-select: none;
      &:hover {
        color: ${theme.palette.colors.primary[500]};
        background: ${theme.palette.colors.primary[100]};
      }
    }

    .selected-option-item {
      color: ${theme.palette.colors.primary[500]};
      background: ${theme.palette.colors.primary[100]};
    }
  }
`;