import { useState } from "react";
import { keyframes, useTheme, css } from "@emotion/react";
import styled from "@emotion/styled";
import Layout from "components/common/Layout";
import Button from "components/common/Button";
import Input from "components/common/Input";
import TextArea from "components/common/TextArea";

import Img from "assets/member1.png";

export default function operator() {
  const theme = useTheme();
  const [showDetailInfo, setShowDetailInfo] = useState(false);
  const onPopupOpen = () => {
    setShowDetailInfo(true);
  };
  const onPopupClose = () => {
    setShowDetailInfo(false);
  };

  return (
    <Layout>
      <div>여기는 운영자 관리</div>
      <button onClick={onPopupOpen}>상세정보 보기</button>
      {showDetailInfo && (
        <Overlay>
          <StyledPopup visible={showDetailInfo} theme={theme}>
            <Container theme={theme}>
              <div>
                <div className="title">상세 정보 조회</div>

                <Flex>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <img src={Img.src} alt={"아바타"} />
                  </div>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      gap: 18,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 8,
                      }}
                    >
                      <div className="label">이름</div>
                      <Input width={260} />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 8,
                      }}
                    >
                      <div className="label">소속</div>
                      <Input width={260} />
                    </div>
                  </div>
                </Flex>
                <Flex>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 18,
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 8,
                      }}
                    >
                      <div className="label">직책</div>
                      <Input width={260} />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 8,
                      }}
                    >
                      <div className="label">권한</div>
                      <Input width={260} />
                    </div>
                  </div>
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 8 }}
                  >
                    <div className="label">직무</div>
                    <TextArea width={260} height={114} />
                  </div>
                </Flex>

                <Flex>
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 8 }}
                  >
                    <div className="label">연락처</div>
                    <Input width={260} />
                  </div>
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 8 }}
                  >
                    <div className="label">이메일</div>
                    <Input width={260} />
                  </div>
                </Flex>

                <Flex>
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 8 }}
                  >
                    <div className="label">아이디</div>
                    <Input width={260} />
                  </div>
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 8 }}
                  >
                    <div className="label">비밀번호</div>
                    <Input width={260} />
                  </div>
                </Flex>

                <ButtonBox>
                  <Button type={"primary"} size={"md"} onClick={onPopupClose}>
                    수정
                  </Button>
                  <Button type={"secondary"} size={"md"} onClick={onPopupClose}>
                    닫기
                  </Button>
                </ButtonBox>
              </div>
            </Container>
          </StyledPopup>
        </Overlay>
      )}
    </Layout>
  );
}

const Flex = styled.div`
  display: flex;
  align-items: stretch;
  gap: 16px;
  margin-top: 18px;
`;

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  touch-action: none;
  z-index: 10;

  background: rgba(0, 0, 0, 0.4);
`;

const Container = styled.div`
  padding: 70px 100px 45px 100px;
  img {
    width: 144px;
    height: 144px;
  }
  .title {
    ${(p) => p.theme.typography.body1}
    ${(p) => p.theme.typography.weightBold}
  
    color: ${(p) => p.theme.palette.colors.basic.black};
    margin-bottom: 62px;

    text-align: left;
  }
  .label {
    ${(p) => p.theme.typography.body3}
    ${(p) => p.theme.typography.weightMedium}
     color: ${(p) => p.theme.palette.colors.basic.black}
  }
`;

const StyledPopup = styled.div`
  position: absolute;
  top: 0;
  right: 0;

  width: 800px;
  height: 100%;

  background: ${(p) => p.theme.palette.colors.basic.white};
  animation: ${(p) => (p.visible ? fadeInLeft : fadeInRight)} 1s;

  box-shadow: 0 0 0 100vw rgba(0, 0, 0, 0.5);
  border-radius: 48px 0px 0px 48px;
`;

const ButtonBox = styled.div`
  gap: 14px;
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 40px;
  width: calc(100% - 200px);
`;

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
