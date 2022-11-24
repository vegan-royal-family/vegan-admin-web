import { useState } from "react";
import { keyframes, useTheme, css } from "@emotion/react";
import styled from "@emotion/styled";
import Layout from "components/common/Layout";
import Button from "components/common/Button";

import Img from "assets/member1.png";
import Input from "components/common/Input";

export default function operator() {
  const theme = useTheme();
  const [showDetailInfo, setShowDetailInfo] = useState(false);
  const onPopupOpen = () => {
    setShowDetailInfo(true);
  };
  const onPopupClose = () => {
    setShowDetailInfo(false);
  };

  const InputField = (props) => {
    const { name } = props;
    const Field = styled.div`
      display: flex;
      flex-direction: column;
      gap: 8px;
    `;
    const Title = styled.div`
      ${theme.typography.body3}
      ${theme.typography.weightMedium}

    color: ${theme.palette.colors.basic.black}
    `;

    return (
      <Field>
        <Title>{name}</Title>
        <Input />
      </Field>
    );
  };

  return (
    <Layout>
      <div>여기는 운영자 관리</div>
      <button onClick={onPopupOpen}>상세정보 보기</button>
      <Popup theme={theme} visible={showDetailInfo}>
        <div className={"title"}>상세정보</div>
        <div style={{ display: "flex" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <img src={Img.src} alt={"아바타"} />
            <InputField name={"직책"} />
            <InputField name={"권한"} />
            <InputField name={"연락처"} />
            <InputField name={"ID"} />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <InputField name={"이름"} />
            <InputField name={"소속"} />
            <InputField name={"직무"} />
            <InputField name={"이메일"} />
            <InputField name={"비밀번호"} />
          </div>
        </div>
        <ButtonBox>
          <Button type={"secondary"} size={"md"} onClick={onPopupClose}>
            수정
          </Button>
          <Button type={"secondary"} size={"md"} onClick={onPopupClose}>
            닫기
          </Button>
        </ButtonBox>
      </Popup>
    </Layout>
  );
}

const fadeInLeft = keyframes`
from {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
to {
  opacity: 1;
  transform: translateZ(0);
}
`;

const fadeInRight = keyframes`
from {
  opacity: 1;
  transform: translateZ(0);
}
to {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 14px;
`;

const Popup = styled.div`
  background: ${(p) => p.theme.palette.colors.basic.white};
  height: 100vh;
  width: 800px;
  padding: 45px;

  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;

  box-shadow: 0 0 0 100vw rgba(0, 0, 0, 0.5);
  border-radius: 48px 0px 0px 48px;

  animation: ${(p) => (p.visible ? fadeInLeft : fadeInRight)} 1s;
  opacity: ${(p) =>
    p.visible === false && 0}; // TODO: 그냥.. 안보이기만 할 뿐... 존재함...
  .title {
    ${(p) => p.theme.typography.body1}
    ${(p) => p.theme.typography.weightBold}
  }
  img {
    width: 160px;
    height: 160px;
  }
`;
