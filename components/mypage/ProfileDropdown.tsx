import { useState, useRef } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import useOnClickOutside from "utils/useOnClickOutside";
import { scaleUpAnimation, scaleDownAnimation } from "styles/animation";
import theme from "styles/theme";
import { UserInfoType } from "types/user";
import ExitIcon from "assets/icon/exit.svg";
import MyPagePopup from "./MyPagePopup";

export default function ProfileDropdown(props: { authValue: UserInfoType }) {
  const router = useRouter();
  const dropdownRef = useRef();

  const { authValue } = props;
  const { userId, email, profileImage, name } = authValue;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [openMyPagePopup, setOpenMyPagePopup] = useState(false);

  // TODO: defaultImage 교체 필요
  const defaultImageSrc =
    "https://i.ytimg.com/vi/hkq5WZBusC4/maxresdefault.jpg";

  useOnClickOutside(dropdownRef, () => setIsDropdownOpen(false));

  return (
    <>
      {openMyPagePopup && (
        <MyPagePopup
          visible={openMyPagePopup}
          onClose={() => setOpenMyPagePopup(false)}
        />
      )}
      <div
        ref={dropdownRef}
        style={{
          position: "relative",
          width: "44px",
          height: "44px",
          marginLeft: "56px",
        }}
      >
        <StyledProfileBox
          size="44px"
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
              size="64px"
              src={profileImage ? profileImage : defaultImageSrc}
              onError={(e: any) => {
                e.target.src = defaultImageSrc;
              }}
              style={{ cursor: "auto" }}
            />
            <span className="nickname-field">{name ?? ""}</span>
            <span className="email-field">{email ?? ""}</span>
          </div>
          <div className="menu-content">
            <div
              className="mypage-link"
              onClick={() => {
                setOpenMyPagePopup(true);
                setIsDropdownOpen(false);
              }}
            >
              내 정보로 이동
            </div>
            <div
              className="logout-link"
              onClick={() => {
                // TODO: 로그아웃 로직 구현
                // 세션 파기?
                // 로그인 페이지로 이동
                router.replace("/login");
              }}
            >
              <ExitIcon />
              로그아웃
            </div>
          </div>
        </DropdownContainer>
      </div>
    </>
  );
}

const StyledProfileBox = styled.img<{ size: number | string }>`
  width: ${(p) => p.size};
  height: ${(p) => p.size};
  border-radius: 50%;
  cursor: pointer;
  user-select: none;
`;

const DropdownContainer = styled.div<{ visible: boolean }>`
  ${scaleUpAnimation}
  ${scaleDownAnimation}
  position: absolute;
  right: 0;
  top: 52px;
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
      ${theme.typography.body2}
      ${theme.typography.weightMedium}
    }
    .nickname-field {
      ${theme.typography.body3}
      ${theme.typography.weightMedium}
      margin-bottom: 4px;
    }
    .email-field {
      ${theme.typography.body4}
      ${theme.typography.weightRegular}
    }
    & > img {
      padding: 16px 0;
    }
  }

  .menu-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px 32px;

    .mypage-link {
      ${theme.typography.body3}
      ${theme.typography.weightMedium}
      color: ${theme.palette.colors.primary[500]};
      margin-bottom: 16px;
      cursor: pointer;
    }
    .logout-link {
      display: flex;
      align-items: center;
      ${theme.typography.body4}
      ${theme.typography.weightMedium}
      color: ${theme.palette.colors.gray[600]};
      cursor: pointer;
      & > svg {
        padding-right: 6px;
      }
    }
  }
`;
