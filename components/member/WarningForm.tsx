import styled from "@emotion/styled";
import Input from "components/common/Input";
import RightSheet from "components/common/RightSheet";
import TextArea from "components/common/TextArea";
import { MouseEvent } from "react";

export default function MemberWarningForm({
  visible,
  onClose,
}: {
  visible?: boolean;
  onClose?: (e: MouseEvent<HTMLButtonElement>) => any;
}) {
  return (
    <RightSheet visible={visible} title="회원 경고 등록" onClose={onClose}>
      <GridItem>
        <FlexColItem>
          <Input width="100%" placeholder="이름을 입력하세요." label="닉네임" />
          <Input width="100%" placeholder="소속을 선택하세요." label="종류" />
        </FlexColItem>
        <TextArea
          width="100%"
          height="100%"
          placeholder="직무 내용을 입력하세요."
          label="사유"
        />
      </GridItem>
      <div style={{ marginTop: 22 }}>
        <Input width="100%" placeholder="소속을 선택하세요." label="차수" />
      </div>
      <Divider />
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

const Divider = styled.div`
  width: 100%;
  height: 1px;
  opacity: 0.2;
  background-color: #0f172a;
  box-sizing: border-box;
  margin: 14px 0px 28px;
`;
