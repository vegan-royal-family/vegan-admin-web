import { useState, useRef } from "react";
import styled from "@emotion/styled";
import useOnClickOutside from "utils/useOnClickOutside";
import { scaleUpAnimation, scaleDownAnimation } from "styles/animation";
import { UserInfoType } from "types/user";
import ExitIcon from "assets/icon/exit.svg";
import theme from "styles/theme";

export default function ProfileDropdown(props: { authValue: UserInfoType }) {
  const { authValue } = props;
  const { userId, email, profileImage, name } = authValue;
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
      <DropdownContainer visible={isDropdownOpen}>
        <div className="profile-content">
          <span className="id-field">{userId ?? ""}</span>
          <StyledProfileBox
            src={profileImage ? profileImage : defaultImageSrc}
            onError={(e: any) => {
              e.target.src = defaultImageSrc;
            }}
          />
          <span className="nickname-field">{name ?? ""}</span>
          <span className="email-field">{email ?? ""}</span>
        </div>
        <div className="menu-content">
          <div className="mypage-link">내 정보로 이동</div>
          <div className="logout-link">
            <ExitIcon />
            로그아웃
          </div>
        </div>
      </DropdownContainer>
    </div>
  );
}

const StyledProfileBox = styled.img`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  cursor: pointer;
`;

const DropdownContainer = styled.div<{ visible: boolean }>`
  ${scaleUpAnimation}
  ${scaleDownAnimation}
  position: absolute;
  right: 0;
  width: 240px;
  background: #ffffff;
  box-shadow: 0px 2px 8px rgba(15, 23, 42, 0.25);
  border-radius: 10px;
  z-index: 1000;
  visibility: ${(p) => (p.visible ? "visible" : "hidden")};
  animation: ${(p) =>
    `${p.visible ? "scaleUp" : "scaleDown"} 200ms ease-in-out forwards`};

  .profile-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 24px 32px 16px;
    background: ${theme.palette.colors.primary[100]};
    border-radius: 10px 10px 0 0;

    .id-field {
    }
    .nickname-field {
    }
    .email-field {
    }
  }

  .menu-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 24px 32px 16px;
    .mypage-link {
    }
    .logout-link {
    }
  }
`;
