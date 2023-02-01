import { useState } from "react";
import range from "utils/range";
import styled from "@emotion/styled";
import usePopup from "utils/usePopup";
import Layout from "components/common/Layout";
import Table from "components/common/Table";
import getTableColumns from "components/restaurant/getTableColumns";

const ToolbarWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 16px 0 46px;
`;

type PopupType = "create" | "detail";

const TableTabs = {
  register_status: 0, // 등록 현황
  inspection_status: 1, // 신청 현황
};

const TabViewStyle = styled.div`
  .tabbar {
    display: flex;
    .tabbar-item {
      padding: 12px 16px;
      cursor: pointer;
      user-select: none;
    }

    .selected-item {
      border-bottom: 3px solid #ff744d;
    }

    & > .tabbar-item:first-child {
      border-right: none;
    }
  }

  .tab-contents {
    padding: 20px;
  }
`;

const TabView = ({ tabList, selectedTabId, contents, onTabChanegd }) => {
  return (
    <TabViewStyle>
      <div className="tabbar">
        {tabList.map((item) => {
          const isSelected = selectedTabId === item?.id;
          return (
            <div
              className={`tabbar-item ${isSelected ? "selected-item" : ""}`}
              onClick={() => onTabChanegd(item.id)}
            >
              {item.name}
            </div>
          );
        })}
      </div>
      <div className="tab-contents">{contents}</div>
    </TabViewStyle>
  );
};

export default function RestaurantPage(/*{ data: serverData }*/) {
  const { popupOption, onPopupOpen, onPopupClose } = usePopup<PopupType>();
  const [selectedTab, setSelectedTab] = useState(TableTabs?.register_status);
  const registerStatusColumns = getTableColumns(
    TableTabs?.register_status,
    onPopupOpen
  );
  const registerStatusList = range(50).map((id) => {
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
  const inspectionStatusColumns = getTableColumns(
    TableTabs?.inspection_status,
    onPopupOpen
  );
  const inspectionStatusList = range(50).map((id) => {
    return {
      name: `검수 현황 상호명-${id}`,
      vegetarianType: "폴로",
      createdAt: "2023-01-12",
      category: "한식",
      multipleSelect: "채식옵션",
      request: "김뫄뫄",
      manager: "관리자",
    };
  });

  const TabContents = () => {
    return (
      <Table
        id="restuarant-management-table"
        columns={
          selectedTab === TableTabs?.register_status
            ? registerStatusColumns
            : inspectionStatusColumns
        }
        data={
          selectedTab === TableTabs?.register_status
            ? registerStatusList
            : inspectionStatusList
        }
      />
    );
  };

  return (
    <Layout>
      <ToolbarWrapper></ToolbarWrapper>
      <TabView
        selectedTabId={selectedTab}
        tabList={[
          { id: TableTabs.register_status, name: "등록 현황" },
          { id: TableTabs?.inspection_status, name: "신청 검수 현황" },
        ]}
        contents={<TabContents />}
        onTabChanegd={(tabId) => {
          setSelectedTab(tabId);
        }}
      />
    </Layout>
  );
}

// export function getServerSideProps(_context) {
//   const res = range(50).map((id) => {
//     return {
//       name: `등록현황 상호명-${id}`,
//       vegetarianType: "폴로",
//       createdAt: "2023-01-12",
//       category: "한식",
//       multipleSelect: "채식옵션",
//       request: "김뫄뫄",
//       manager: "관리자",
//     };
//   });
//   const data = JSON.stringify(res);

//   return {
//     props: { data }, // will be passed to the page component as props
//   };
// }
