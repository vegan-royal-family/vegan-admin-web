import { useState } from "react";
import Layout from "components/common/Layout";
import OperatorForm from "components/manage/operator/form";

export default function operator() {
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
