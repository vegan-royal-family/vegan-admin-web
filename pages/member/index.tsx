import Layout from "components/common/Layout";
import { useState } from "react";
import HistoryPopup from "components/member/HistoryPopup";
import MemberWarningForm from "components/member/WarningForm";
import MemberInactiveForm from "components/member/InactiveForm";
import Table from "components/common/Table";
import range from "utils/range";
import styled from "@emotion/styled";
import Icon from "components/common/Icon";

const PageWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 48px 60px;
  flex: 1;
`;

export default function MemberPage({ data }) {
  const [popupVisible, setPopupVisible] = useState<{
    type: "" | "history" | "warning" | "inactive";
    visible: boolean;
  }>({ type: "", visible: false });

  const onPopupOpen = (type: "" | "history" | "warning" | "inactive") => {
    setPopupVisible({
      type,
      visible: true,
    });
  };

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
          <button type="button" onClick={() => onPopupOpen("history")}>
            조회
          </button>
        );
      },
      options: {
        width: "100px",
        headerAlign: "center",
        cellAlign: "center",
      },
    },
    {
      Header: "관리",
      headerRender: () => {
        return <Icon icon="attention" size="sm" />;
      },
      cellRender: (data) => {
        // 경고 2회가 넘은 사람만 비활성화 버튼이 활성화됨
        return (
          <div>
            <button type="button" onClick={() => onPopupOpen("warning")}>
              경고
            </button>
            <button type="button" onClick={() => onPopupOpen("inactive")}>
              비활성화
            </button>
          </div>
        );
      },
      options: {
        width: "150px",
        headerAlign: "center",
        cellAlign: "center",
      },
    },
  ];

  // const getData = (len) => {
  //   return range(len).map((id) => {
  //     return {
  //       id: id,
  //       nickname: `꽈뚜루빠뚜루밥밥디라라-${id}`,
  //       vegetarianType: "폴로",
  //       gender: "male",
  //       birth: "2001-04-11",
  //       snsType: "카카오",
  //       createdAt: "2022-12-31 23:47:58",
  //       warningCount: 0,
  //     };
  //   });
  // };

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
        <Table
          id="member-management-table"
          columns={columns}
          data={JSON.parse(data)}
          fetchData={(sortOption) => {
            // TODO: 정렬 UI 테스트를 위해 임시로 구현해놓은 것. 수정해야함.
            const order = sortOption?.isDesc ? "desc" : "asc";
            return [
              {
                id: 1,
                nickname: `${sortOption?.id}-${order}`,
                vegetarianType: "폴로",
                gender: "male",
                birth: "2001-04-11",
                snsType: "카카오",
                createdAt: "2022-12-31 23:47:58",
                warningCount: 0,
              },
            ];
          }}
        />
      </PageWrapper>
    </Layout>
  );
}

export function getServerSideProps(context) {
  const res = range(50).map((id) => {
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
  const data = JSON.stringify(res);

  return {
    props: { data }, // will be passed to the page component as props
  };
}
