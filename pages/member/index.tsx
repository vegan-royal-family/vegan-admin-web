import Layout from "components/common/Layout";
import { useState } from "react";
import HistoryPopup from "components/member/HistoryPopup";
import MemberWarningForm from "components/member/WarningForm";
import MemberInactiveForm from "components/member/InactiveForm";
import Table from "components/common/Table";
import range from "utils/range";
import styled from "@emotion/styled";

const PageWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 48px 60px;
  flex: 1;
`;

export default function MemberPage() {
  const [popupVisible, setPopupVisible] = useState<{
    type: "" | "history" | "warning" | "inactive";
    visible: boolean;
  }>({ type: "", visible: false });

  const onPopupClose = () => {
    setPopupVisible({
      type: "",
      visible: false,
    });
  };

  const columns = [
    {
      Header: "닉네임",
      accessor: "nickname",
      options: {
        align: "start",
      },
    },
    {
      Header: "유형",
      accessor: "vegetarianType",
      options: {
        width: "80px",
      },
    },
    {
      Header: "성별",
      accessor: "gender",
      options: {
        width: "80px",
      },
    },
    {
      Header: "생년월일",
      accessor: "birth",
      options: {
        width: "120px",
      },
    },
    {
      Header: "SNS",
      accessor: "snsType",
      options: {
        width: "80px",
      },
    },
    {
      Header: "가입일시",
      accessor: "createdAt",
      options: {
        width: "160px",
      },
    },
    {
      Header: "처리 이력",
      cellRender: (data) => {
        return (
          <button
            type="button"
            onClick={() => alert(`${data.nickname} 처리 이력 오픈!`)}
          >
            조회
          </button>
        );
      },
      options: {
        width: "100px",
      },
    },
    {
      Header: "관리",
      // headerRender: () => {
      //   return <FaceIcon />;
      // },
      cellRender: (data) => {
        // 경고, 비활성화 버튼
        // 경고 2회가 넘은 사람만 비활성화 버튼이 활성화됨
        const buttonEnabled = (data?.warningCount ?? 0) > 2;
        return (
          <div>
            <button>경고</button>
            <button disabled={!buttonEnabled}>비활성화</button>
          </div>
        );
      },
      options: {
        width: "150px",
      },
    },
  ];

  const getData = (len) => {
    return range(len).map((id) => {
      return {
        id: id,
        nickname: `꽈뚜루빠뚜루밥밥디라라-${id}`,
        vegetarianType: "폴로",
        gender: "male",
        birth: "2001-04-11",
        snsType: "카카오",
        createdAt: "2022-12-31 23:47:58",
        warningCount: 0,
      };
    });
  };

  return (
    <Layout>
      {popupVisible?.visible && popupVisible.type === "history" && (
        <HistoryPopup visible={popupVisible?.visible} onClose={onPopupClose} />
      )}
      {popupVisible?.visible && popupVisible.type === "warning" && (
        <MemberWarningForm
          visible={popupVisible?.visible}
          onClose={onPopupClose}
        />
      )}
      {popupVisible?.visible && popupVisible.type === "inactive" && (
        <MemberInactiveForm
          visible={popupVisible?.visible}
          onClose={onPopupClose}
        />
      )}
      <PageWrapper>
        <Table columns={columns} data={getData(79)} />
      </PageWrapper>
    </Layout>
  );
}
