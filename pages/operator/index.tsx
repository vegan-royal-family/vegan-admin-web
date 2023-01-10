import { useState } from "react";
import Layout from "components/common/Layout";
import OperatorForm from "components/operator/Form";

export default function OperatorPage() {
  const [showDetailInfo, setShowDetailInfo] = useState(false);
  const onPopupOpen = () => {
    setShowDetailInfo(true);
  };
  const onPopupClose = () => {
    setShowDetailInfo(false);
  };

  return (
    <Layout>
      <div>여기는 운영자 관리</div>
      <button onClick={onPopupOpen}>상세정보 보기</button>
      {showDetailInfo && (
        <OperatorForm visible={showDetailInfo} onClose={onPopupClose} />
      )}
    </Layout>
  );
}