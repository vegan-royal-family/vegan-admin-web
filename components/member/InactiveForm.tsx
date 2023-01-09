import styled from "@emotion/styled";
import Button from "components/common/Button";
import Input from "components/common/Input";
import RightSheet from "components/common/RightSheet";
import TextArea from "components/common/TextArea";
import { MouseEvent } from "react";

export default function MemberInactiveForm({
  visible,
  onClose,
}: {
  visible?: boolean;
  onClose?: (e: MouseEvent<HTMLButtonElement>) => any;
}) {
  return (
    <RightSheet visible={visible} title={"회원 비활성화 등록"}>
      <GridItem>
        <FlexColItem>
          <Input
            width={260}
            placeholder={"이름을 입력하세요."}
            label={"닉네임"}
          />
          <Input
            width={260}
            placeholder={"소속을 선택하세요."}
            label={"종류"}
          />
        </FlexColItem>
        <TextArea
          width={260}
          height={114}
          placeholder={"직무 내용을 입력하세요."}
          label={"사유"}
        />
      </GridItem>
      <div style={{ marginTop: 14 }}>
        <Input width={570} placeholder={"소속을 선택하세요."} label={"차수"} />
      </div>
      <Divider />
      <ButtonBox>
        <Button type={"secondary"} size={"md"} onClick={onClose}>
          닫기
        </Button>
      </ButtonBox>
    </RightSheet>
  );
}

const ButtonBox = styled.div`
  gap: 14px;
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 40px;
  width: calc(100% - 200px);
`;

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
  opacity: 0.3;
  border: 0.3px solid #0f172a;
  margin: 14px 0px;
`;
