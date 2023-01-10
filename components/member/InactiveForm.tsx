import styled from "@emotion/styled";
import Input from "components/common/Input";
import RightSheet from "components/common/RightSheet";
import TextArea from "components/common/TextArea";
import { MouseEvent } from "react";
import Divider from "components/common/Divider";

export default function MemberInactiveForm({
  visible,
  onClose,
}: {
  visible?: boolean;
  onClose?: (e: MouseEvent<HTMLButtonElement>) => any;
}) {
  return (
    <RightSheet
      visible={visible}
      title="회원 비활성화 등록"
      onClose={onClose}
      onSave={() => {}}
    >
      <GridItem>
        <FlexColItem>
          <Input width="100%" placeholder="이름을 입력하세요." label="닉네임" />
          <Input width="100%" placeholder="정책을 선택하세요." label="종류" />
        </FlexColItem>
        <TextArea
          width="100%"
          height="100%"
          placeholder="직무 내용을 입력하세요."
          label="사유"
        />
      </GridItem>
      <Divider />
      <BottomItem>
        <Divider />
        <Input
          width="100%"
          placeholder="이름 / 소속 / 직책 / 연락처"
          label="처리자 정보"
        />
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

const BottomItem = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const GridItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 16px;
  row-gap: 22px;
`;
