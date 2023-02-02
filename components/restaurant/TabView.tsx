import styled from "@emotion/styled";

const TabView = ({ tabList, selectedTabId, tabContent, onTabChanegd }) => {
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
      <div className="tab-contents">{tabContent}</div>
    </TabViewStyle>
  );
};

const TabViewStyle = styled.div`
  width: 100%;
  .tabbar {
    display: flex;
    .tabbar-item {
      padding: 10px 16px;
      cursor: pointer;
      user-select: none;
    }

    .selected-item {
      background-color: #ff744d;
      color: #fff;
    }
  }

  .tab-contents {
    padding: 10px 0;
  }
`;

export default TabView;
