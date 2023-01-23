import dayjs from "dayjs";
import styled from "@emotion/styled";
import Button from "components/common/Button";
import Input from "components/common/Input";
import TextArea from "components/common/TextArea";
import RightSheet from "components/common/RightSheet";
import Img from "assets/member1.png";
import { MouseEvent } from "react";
import Divider from "components/common/Divider";
import Dropdown from "components/common/Dropdown";

export default function OperatorForm({
  visible,
  onClose,
}: {
  visible?: boolean;
  onClose?: (e: MouseEvent<HTMLButtonElement>) => any;
}) {
  return (
    <RightSheet
      visible={visible}
      title="상세 정보 조회"
      onClose={onClose}
      onSave={() => {}}
    >
      <GridItem>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            gap: 14,
          }}
        >
          <ImgBox src={Img.src} alt="아바타" />
          <div
            style={{
              display: "flex",
              gap: 14,
              flexDirection: "column",
            }}
          >
            <Button size="sm" type="tertiary" label="수정" />
            <Button size="sm" type="secondary" label="삭제" />
          </div>
        </div>
        <FlexColItem>
          <Input width="100%" placeholder="이름을 입력하세요." label="이름" />
          <Dropdown
            width="100%"
            placeholder="소속을 선택하세요."
            label="소속"
            options={[{ id: 1, name: "소속" }]}
          />
        </FlexColItem>
        <FlexColItem>
          <Dropdown
            width="100%"
            placeholder="직책을 선택하세요."
            label="직책"
            options={[{ id: 1, name: "직책" }]}
          />
          <Dropdown
            width="100%"
            placeholder="권한을 선택하세요."
            label="권한"
            options={[{ id: 1, name: "권한" }]}
          />
        </FlexColItem>
        <TextArea
          width="100%"
          height="100%"
          placeholder="직무 내용을 입력하세요."
          label="직무"
        />
        <Input width="100%" placeholder="010-0000-0000" label="연락처" />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            justifyContent: "flex-end",
          }}
        >
          <Input width="100%" placeholder="abc@vegan.or.kr" />
        </div>
        <Input
          width="100%"
          placeholder="영문 4자 이상 입력하세요."
          label="아이디"
        />
        <Input
          width="100%"
          placeholder="8자 이상 입력하세요.(영문, 숫자 혼용)"
          label="비밀번호"
        />
      </GridItem>
      <BottomItem>
        <Divider />
        <GridItem>
          <Input
            width="100%"
            label="등록일시"
            disabled={true}
            value={dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss")}
          />
          <Input
            width="100%"
            label="수정일시"
            disabled={true}
            value={dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss")}
          />
        </GridItem>
      </BottomItem>
    </RightSheet>
  );
}

const FlexColItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: 100%;
`;

const GridItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 16px;
  row-gap: 22px;
`;

const ImgBox = styled.img`
  width: 180px;
  height: 180px;
`;

const BottomItem = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;
