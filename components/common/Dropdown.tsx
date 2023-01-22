import { useRef, useState } from "react";
import styled from "@emotion/styled";
import theme from "styles/theme";
import { scaleUpAnimation, scaleDownAnimation } from "styles/animation";
import useOnClickOutside from "utils/useOnClickOutside";
import Icon from "./Icon";

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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(defaultValueId);

  const onOptionClicked = (option: OptionType) => {
    onChange(option);
    setSelectedId(option.id);
    setIsDropdownOpen(false);
  };

  // ref 바깥 영역을 클릭했을 때 dropdown이 닫히도록 함
  useOnClickOutside(clickOutsideRef, () => setIsDropdownOpen(false));

  return (
    <div className="custom-dropdown-input" style={{ width }}>
      {label && <StyledLabel className="label">{label}</StyledLabel>}
      <div ref={clickOutsideRef} style={{ position: "relative", width }}>
        <StyledInput
          id={id}
          className={className}
          placeholder={placeholder}
          width={width}
          height={height}
          onClick={() => setIsDropdownOpen((value) => !value)}
        >
          {selectedId ? (
            <span className="selected-item">
              {options.filter((item) => item.id === selectedId)[0]?.name}
            </span>
          ) : (
            <span className="placeholder">{placeholder}</span>
          )}
          <Icon icon={isDropdownOpen ? "up" : "down"} size="sm" />
        </StyledInput>
        <DropdownContainer width={width} visible={isDropdownOpen}>
          <ul>
            {options.map((option) => {
              const isSelected = option.id === selectedId;
              return (
                <li
                  className={
                    isSelected ? "selected-option-item" : "option-item"
                  }
                  onClick={() => onOptionClicked(option)}
                >
                  {option.name}
                </li>
              );
            })}
          </ul>
        </DropdownContainer>
      </div>
    </div>
  );
}

const StyledLabel = styled.div<{ disabled?: boolean }>`
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

const DropdownContainer = styled.div<{
  width: string | number;
  visible: boolean;
}>`
  ${theme.typography.body3}
  ${theme.typography.weightMedium}
  ${scaleUpAnimation}
  ${scaleDownAnimation}

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
  visibility: ${(p) => (p.visible ? "visible" : "hidden")};
  animation: ${(p) =>
    `${p.visible ? "scaleUp" : "scaleDown"} 200ms ease-in-out forwards`};

  ul {
    padding: 0;
    margin: 0;

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
    & > li:first-child {
      border-radius: 5px 5px 0 0;
    }
    & > li:last-child {
      border-radius: 0 0 5px 5px;
    }

    .selected-option-item {
      color: ${theme.palette.colors.primary[500]};
      background: ${theme.palette.colors.primary[100]};
    }
  }
`;
