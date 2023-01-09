import Layout from "components/common/Layout";
import { useState } from "react";
import HistoryPopup from "components/member/HistoryPopup";
import MemberWarningForm from "components/member/WarningForm";
import MemberInactiveForm from "components/member/InactiveForm";

export default function MemberPage() {
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
        <HistoryPopup visible={showHistory} onClose={onHistoryClose} />
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
