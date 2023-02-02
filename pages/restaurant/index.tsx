import { useState } from "react";
import range from "utils/range";
import styled from "@emotion/styled";
import usePopup from "utils/usePopup";
import Layout from "components/common/Layout";
import Table from "components/common/Table";
import getTableColumns from "components/restaurant/getTableColumns";
import TabView from "components/restaurant/TabView";

const TABLE_TAB = {
  registered: 0, // 등록
  inspection: 1, // 검수
};

const TABLE_TAB_LIST = [
  { id: TABLE_TAB.registered, name: "등록 현황" },
  { id: TABLE_TAB?.inspection, name: "신청 검수 현황" },
];

type PopupType = "create" | "detail";

const getInspectionList = () => {
  const statusList = ["todo", "inprogress", "approved", "rejected"];
  return range(4).map((id) => {
    return {
      name: `상호명-${id}`,
      vegetarianType: "폴로",
      createdAt: "2023-01-12",
      category: "한식",
      multipleSelect: "채식옵션",
      request: "김뫄뫄",
      manager: "관리자",
      status: statusList[id],
    };
  });
};

const getRegisteredList = () => {
  return range(50).map((id) => {
    return {
      name: `상호명-${id}`,
      vegetarianType: "폴로",
      createdAt: "2023-01-12",
      category: "한식",
      multipleSelect: "채식옵션",
      request: "김뫄뫄",
      manager: "관리자",
    };
  });
};

export default function RestaurantPage({ data: serverData }) {
  const { popupOption, onPopupOpen, onPopupClose } = usePopup<PopupType>();
  const [selectedTab, setSelectedTab] = useState(TABLE_TAB.registered);
  const [list, setList] = useState(JSON.parse(serverData));
  const columns = getTableColumns(selectedTab, onPopupOpen);

  const TabContent = () => {
    return (
      <ContentWrapper>
        <div style={{ flex: 1 }}>
          <Table
            id="restuarant-management-table"
            columns={columns}
            data={list}
          />
        </div>
        <DetailViewBox />
      </ContentWrapper>
    );
  };

  return (
    <Layout>
      <ToolbarWrapper></ToolbarWrapper>
      <TabView
        selectedTabId={selectedTab}
        tabList={TABLE_TAB_LIST}
        tabContent={<TabContent />}
        onTabChanegd={(tabId) => {
          setSelectedTab(tabId);
          if (tabId === TABLE_TAB.inspection) {
            setList(getInspectionList());
          } else {
            setList(getRegisteredList());
          }
        }}
      />
    </Layout>
  );
}

export function getServerSideProps(_context) {
  const res = range(50).map((id) => {
    return {
      name: `등록 현황 상호명-${id}`,
      vegetarianType: "폴로",
      createdAt: "2023-01-12",
      category: "한식",
      multipleSelect: "채식옵션",
      request: "김뫄뫄",
      manager: "관리자",
    };
  });
  const data = JSON.stringify(res);

  return {
    props: { data },
  };
}

const ToolbarWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 16px 0 46px;
`;

const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
`;

const DetailViewBox = styled.div`
  width: 580px;
  border: 1px solid ${(props) => props.theme.palette.colors.gray[300]};
  margin-left: 60px;
`;
