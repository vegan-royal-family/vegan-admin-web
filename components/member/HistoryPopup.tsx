import styled from "@emotion/styled";
import Input from "components/common/Input";
import RightSheet from "components/common/RightSheet";
import TextArea from "components/common/TextArea";
import { MouseEvent } from "react";
import Divider from "components/common/Divider";
import Dropdown from "components/common/Dropdown";

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

const CommonForm = ({ name, category, categoryOptions, reason }) => (
  <>
    <FlexColItem>
      <Input
        width="100%"
        placeholder="이름을 입력하세요."
        label="닉네임"
        value={name}
        readOnly
      />
      <Dropdown
        width="100%"
        placeholder="종류를 선택하세요."
        label="종류"
        options={categoryOptions}
        defaultValueId={category}
        readOnly
      />
    </FlexColItem>
    <TextArea
      width="100%"
      height="100%"
      placeholder="사유를 입력하세요."
      label="사유"
      value={reason}
      readOnly
    />
  </>
);

const InactiveForm = ({ inactivedDate, managerInfo }) => (
  <>
    <Input
      width="100%"
      placeholder="비활성화 일시를 입력하세요."
      label="비활성화 일시"
      value={inactivedDate}
      readOnly
    />
    <Input
      width="100%"
      placeholder="이름 / 소속 / 직책 / 연락처"
      label="처리자 정보"
      value={managerInfo}
      readOnly
    />
  </>
);

const WarningForm = ({ count, warningDate, managerInfo }) => (
  <>
    <Input
      width="100%"
      placeholder="차수를 입력하세요."
      label="차수"
      value={count}
      readOnly
    />
    <Input
      width="100%"
      placeholder="경고일시를 입력하세요."
      label="경고일시"
      value={warningDate}
      readOnly
    />
    <Input
      width="100%"
      placeholder="이름 / 소속 / 직책 / 연락처"
      label="처리자 정보"
      value={managerInfo}
      readOnly
    />
  </>
);

// 경고 및 비활성화 이력 조회
export default function MemberHistoryPopup({
  visible,
  onClose,
}: {
  visible?: boolean;
  onClose?: (e: MouseEvent<HTMLButtonElement>) => any;
}) {
  const historyList = [
    {
      name: "김뫄뫄",
      type: "warning",
      category: 1,
      reason: "경고 사유는 악플 작성입니다.",
      warningCount: 1,
      warningDate: "2023/01/01",
      managerInfo: "김뫄뫄/소속/직책/연락처",
    },
    {
      name: "김뫄뫄",
      type: "inactive",
      category: 2,
      reason: "비활성화 사유.",
      inactivedDate: "2023/01/01",
      managerInfo: "김뫄뫄/소속/직책/연락처",
    },
    {
      name: "김뫄뫄",
      type: "warning",
      category: 3,
      reason: "경고 사유.",
      warningCount: 2,
      warningDate: "2023/01/01",
      managerInfo: "김뫄뫄/소속/직책/연락처",
    },
  ];

  const categoryOptions = [
    { id: 1, name: "종류1" },
    { id: 2, name: "종류2" },
    { id: 3, name: "종류3" },
  ];

  return (
    <RightSheet
      visible={visible}
      title="경고 및 비활성화 이력 조회"
      onClose={onClose}
      closeButtonText="닫기"
    >
      {historyList.map((item) => {
        return (
          <>
            <GridItem>
              <CommonForm
                name={item.name}
                category={item.category}
                categoryOptions={categoryOptions}
                reason={item.reason}
              />
              {item.type === "warning" ? (
                <WarningForm
                  count={item?.warningCount}
                  warningDate={item?.warningDate}
                  managerInfo={item?.managerInfo}
                />
              ) : (
                <InactiveForm
                  inactivedDate={item?.inactivedDate}
                  managerInfo={item?.managerInfo}
                />
              )}
            </GridItem>
            <Divider />
          </>
        );
      })}
    </RightSheet>
  );
}
