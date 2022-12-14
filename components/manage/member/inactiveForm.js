import styled from "@emotion/styled";
import Button from "components/common/Button";
import RightSheet from "components/common/RightSheet";

export default function MemberInactiveForm({ visible, onClose }) {
  return (
    <RightSheet visible={visible} title={"회원 비활성화 등록"}>
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
