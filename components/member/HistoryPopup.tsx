import styled from "@emotion/styled";
import Input from "components/common/Input";
import RightSheet from "components/common/RightSheet";
import TextArea from "components/common/TextArea";
import { MouseEvent } from "react";
import Divider from "components/common/Divider";

// 경고 및 비활성화 이력 조회
export default function MemberHistoryPopup({
  visible,
  onClose,
}: {
  visible?: boolean;
  onClose?: (e: MouseEvent<HTMLButtonElement>) => any;
}) {
  return (
    <RightSheet
      visible={visible}
      title="경고 및 비활성화 이력 조회"
      onClose={onClose}
      closeButtonText="닫기"
    >
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
        <Input
          width="100%"
          placeholder="이름을 입력하세요."
          label="비활성화 일시"
        />
        <Input
          width="100%"
          placeholder="소속을 선택하세요."
          label="처리자 정보"
        />
      </GridItem>
      <Divider />
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
        <Input width="100%" placeholder="이름을 입력하세요." label="차수" />
        <Input width="100%" placeholder="소속을 선택하세요." label="경고일시" />
      </GridItem>
      <div style={{ marginTop: 22 }}>
        <Input
          width="100%"
          placeholder="소속을 선택하세요."
          label="처리자 정보"
        />
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
