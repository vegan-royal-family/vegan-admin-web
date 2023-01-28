import styled from "@emotion/styled";
import range from "utils/range";
import Layout from "components/common/Layout";
import HistoryPopup from "components/member/HistoryPopup";
import MemberWarningForm from "components/member/WarningForm";
import MemberInactiveForm from "components/member/InactiveForm";
import Table from "components/common/Table";
import usePopup from "utils/usePopup";
import getTableColumns from "components/member/getTableColumns";

const ToolbarWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 16px 0 46px;
`;

type PopupType = "history" | "warning" | "inactive";

export default function MemberPage({ data }) {
  const { popupOption, onPopupOpen, onPopupClose } = usePopup<PopupType>();
  const columns = getTableColumns(onPopupOpen);

  return (
    <Layout>
      {popupOption?.visible && popupOption.type === "history" && (
        <HistoryPopup visible={popupOption?.visible} onClose={onPopupClose} />
      )}
      {popupOption?.visible && popupOption.type === "warning" && (
        <MemberWarningForm
          visible={popupOption?.visible}
          onClose={onPopupClose}
        />
      )}
      {popupOption?.visible && popupOption.type === "inactive" && (
        <MemberInactiveForm
          visible={popupOption?.visible}
          onClose={onPopupClose}
        />
      )}
      <ToolbarWrapper></ToolbarWrapper>
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
    </Layout>
  );
}

export function getServerSideProps(_context) {
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
