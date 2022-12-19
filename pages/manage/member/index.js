import Layout from "components/common/Layout";
import { useState } from "react";
import MemberHistory from "components/manage/member/history";
import MemberWarningForm from "components/manage/member/warningForm";
import MemberInactiveForm from "components/manage/member/inactiveForm";

export default function MemberManagementPage() {
  const [showHistory, setShowHistory] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [showInactive, setShowInactive] = useState(false);

  const onHistoryOpen = () => setShowHistory(true);
  const onHistoryClose = () => setShowHistory(false);
  const onWarningOpen = () => setShowWarning(true);
  const onWarningClose = () => setShowWarning(false);
  const onInactiveOpen = () => setShowInactive(true);
  const onInactiveClose = () => setShowInactive(false);

  return (
    <Layout>
      <button onClick={onHistoryOpen}>경고 및 비활성화 이력 조회</button>
      {showHistory && (
        <MemberHistory visible={showHistory} onClose={onHistoryClose} />
      )}
      <button onClick={onWarningOpen}>회원 경고 등록</button>
      {showWarning && (
        <MemberWarningForm visible={showWarning} onClose={onWarningClose} />
      )}
      <button onClick={onInactiveOpen}>회원 비활성화 등록</button>
      {showInactive && (
        <MemberInactiveForm visible={showInactive} onClose={onInactiveClose} />
      )}
    </Layout>
  );
}
