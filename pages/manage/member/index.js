import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import Button from "components/common/Button";
import Layout from "components/common/Layout";
import RightSheet from "components/common/RightSheet";
import { useState } from "react";

export default function MemberManagementPage() {
  const theme = useTheme();
  const [showHistory, setShowHistory] = useState(false);
  const onHistoryOpen = () => setShowHistory(true);
  const onHistoryClose = () => setShowHistory(false);
  return (
    <Layout>
      <button onClick={onHistoryOpen}>경고 및 비활성화 이력 조회</button>
      {showHistory && (
        <RightSheet visible={showHistory}>
          <TitleBox theme={theme}>경고 및 비활성화 이력 조회</TitleBox>

          <ButtonBox>
            <Button type={"secondary"} size={"md"} onClick={onHistoryClose}>
              닫기
            </Button>
          </ButtonBox>
        </RightSheet>
      )}
    </Layout>
  );
}

const TitleBox = styled.div`
  ${(p) => p.theme.typography.body1}
  ${(p) => p.theme.typography.weightBold}
  
  color: ${(p) => p.theme.palette.colors.basic.black};
  margin-bottom: 62px;

  text-align: left;
`;
const ButtonBox = styled.div`
  gap: 14px;
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 40px;
  width: calc(100% - 200px);
`;
