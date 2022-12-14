import { useState } from "react";
import dayjs from "dayjs";
import styled from "@emotion/styled";
import Layout from "components/common/Layout";
import Button from "components/common/Button";
import Input from "components/common/Input";
import TextArea from "components/common/TextArea";

import Img from "assets/member1.png";
import RightSheet from "components/common/RightSheet";
import { useTheme } from "@emotion/react";

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
        <RightSheet visible={showDetailInfo}>
          <div style={{ height: "100%" }}>
            <TitleBox theme={theme}>상세 정보 조회</TitleBox>

            <Flex>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  gap: 30,
                }}
              >
                <ImgBox src={Img.src} alt={"아바타"} />
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
                <Input width={260} placeholder={"이름을 입력하세요."} label={"이름"} />
                <Input width={260} placeholder={"소속을 선택하세요."} label={"소속"} />
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
                <Input width={260} placeholder={"직책을 선택하세요."} label={"직책"} />
                <Input width={260} placeholder={"권한을 선택하세요."} label={"권한"} />
              </div>
              <TextArea
                width={260}
                height={114}
                placeholder={"직무 내용을 입력하세요."}
                label={"직무"}
              />
            </Flex>

            <Flex>
              <Input width={260} placeholder={"010-0000-0000"} label={"연락처"} />
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
        </RightSheet>
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

const ButtonBox = styled.div`
  gap: 14px;
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 40px;
  width: calc(100% - 200px);
`;
const ImgBox = styled.img`
  width: 144px;
  height: 144px;
`;

const TitleBox = styled.div`
  ${(p) => p.theme.typography.body1}
  ${(p) => p.theme.typography.weightBold}
  
  color: ${(p) => p.theme.palette.colors.basic.black};
  margin-bottom: 62px;

  text-align: left;
`;
