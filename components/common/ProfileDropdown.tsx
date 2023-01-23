import { useState, useRef } from "react";
import styled from "@emotion/styled";
import useOnClickOutside from "utils/useOnClickOutside";
import { scaleUpAnimation, scaleDownAnimation } from "styles/animation";
import { UserInfoType } from "types/user";

export default function ProfileDropdown(props: { authValue: UserInfoType }) {
  const { authValue } = props;
  const { id, authorization, profileImage, name } = authValue;
  // TODO: defaultImage 교체 필요
  const defaultImageSrc =
    "https://i.ytimg.com/vi/hkq5WZBusC4/maxresdefault.jpg";
  const dropdownRef = useRef();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useOnClickOutside(dropdownRef, () => setIsDropdownOpen(false));

  return (
    <div
      ref={dropdownRef}
      style={{ width: "fit-content", position: "relative" }}
    >
      <StyledProfileBox
        src={profileImage ? profileImage : defaultImageSrc}
        onError={(e: any) => {
          e.target.src = defaultImageSrc;
        }}
        onClick={() => setIsDropdownOpen((value) => !value)}
      />
      <DropdownContainer visible={isDropdownOpen} />
    </div>
  );
}

const StyledProfileBox = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  margin-left: 24px;
  cursor: pointer;
`;

const DropdownContainer = styled.div<{ visible: boolean }>`
  ${scaleUpAnimation}
  ${scaleDownAnimation}
  position: absolute;
  right: 0;
  width: 240px;
  height: 300px;
  background: #ffffff;
  box-shadow: 0px 2px 8px rgba(15, 23, 42, 0.25);
  border-radius: 10px;
  z-index: 1000;
  visibility: ${(p) => (p.visible ? "visible" : "hidden")};
  animation: ${(p) =>
    `${p.visible ? "scaleUp" : "scaleDown"} 200ms ease-in-out forwards`};
`;
