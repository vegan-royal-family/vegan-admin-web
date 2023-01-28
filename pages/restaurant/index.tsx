import { useEffect, useState } from "react";
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

export default function RestaurantPage() {
  const { popupOption, onPopupOpen, onPopupClose } = usePopup<PopupType>();
  const [selectedTab, setSelectedTab] = useState(0);
  //const [data, setData] = useState([]);
  const columns = getTableColumns(selectedTab, onPopupOpen);

  const data = range(50).map((index) => {
    return {
      name: `상호명-${index}`,
      vegetarianType: "폴로",
      createdAt: "2023-01-12",
      category: "한식",
      multipleSelect: "채식옵션",
      request: "김뫄뫄",
      manager: "관리자",
    };
  });

  return (
    <Layout>
      <ToolbarWrapper></ToolbarWrapper>
      <Table id="restuarant-management-table" columns={columns} data={data} />
    </Layout>
  );
}
