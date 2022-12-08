import { useState } from "react";
import { keyframes, useTheme, css } from "@emotion/react";
import dayjs from "dayjs";
import styled from "@emotion/styled";
import Layout from "components/common/Layout";
import Button from "components/common/Button";
import Input from "components/common/Input";
import TextArea from "components/common/TextArea";

import Img from "assets/member1.png";

export default function operator() {
  const theme = useTheme();
  const [showDetailInfo, setShowDetailInfo] = useState(true);
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
                      gap: 30,
                    }}
                  >
                    <img src={Img.src} alt={"아바타"} />
                    <div
                      style={{
                        display: "flex",
                        gap: 20,
                        flexDirection: "column",
                      }}
                    >
                      <Button size="sm" type={"tertiary"} label={"수정"} />
                      <Button size="sm" type={"secondary"} label={"삭제"} />
                    </div>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      gap: 18,
                    }}
                  >
                    <Input
                      width={260}
                      placeholder={"이름을 입력하세요."}
                      label={"이름"}
                    />
                    <Input
                      width={260}
                      placeholder={"소속을 선택하세요."}
                      label={"소속"}
                    />
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
                    <Input
                      width={260}
                      placeholder={"직책을 선택하세요."}
                      label={"직책"}
                    />
                    <Input
                      width={260}
                      placeholder={"권한을 선택하세요."}
                      label={"권한"}
                    />
                  </div>
                  <TextArea
                    width={260}
                    height={114}
                    placeholder={"직무 내용을 입력하세요."}
                    label={"직무"}
                  />
                </Flex>

                <Flex>
                  <Input
                    width={260}
                    placeholder={"010-0000-0000"}
                    label={"연락처"}
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                      justifyContent: "flex-end",
                    }}
                  >
                    <Input width={260} placeholder={"abc@vegan.or.kr"} />
                  </div>
                </Flex>

                <Flex>
                  <Input
                    width={260}
                    placeholder={"영문 4자 이상 입력하세요."}
                    label={"아이디"}
                  />
                  <Input
                    width={260}
                    placeholder={"8자 이상 입력하세요.(영문, 숫자 혼용)"}
                    label={"비밀번호"}
                  />
                </Flex>

                <Flex>
                  <Input
                    width={260}
                    label={"등록일시"}
                    disabled={true}
                    value={dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss")}
                  />
                  <Input
                    width={260}
                    label={"수정일시"}
                    disabled={true}
                    value={dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss")}
                  />
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
  justify-content: space-between;
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
