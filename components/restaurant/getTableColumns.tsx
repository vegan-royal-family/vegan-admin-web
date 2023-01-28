const getTableColumns = (tabId: number, onPopupOpen: Function) => {
  const requestStatus = [
    {
      Header: "신청일시",
      accessor: "createdAt",
    },
    {
      Header: "상호명",
      accessor: "name",
      options: {
        width: "80px",
      },
    },
    {
      Header: "채식유형",
      accessor: "vegetarianType",
      options: {
        width: "80px",
      },
    },
    {
      Header: "카테고리",
      accessor: "category",
      options: {
        width: "80px",
      },
    },
    {
      Header: "복수선택",
      accessor: "multipleSelect",
      options: {
        width: "80px",
      },
    },
    {
      Header: "신청자",
      accessor: "request",
      options: {
        width: "80px",
      },
    },
    {
      Header: "검수자",
      accessor: "manager",
      options: {
        width: "80px",
      },
    },
    {
      Header: "진행 상세",
      cellRender: (data) => {
        return (
          <button type="button" onClick={() => onPopupOpen("detail")}>
            조회
          </button>
        );
      },
      options: {
        width: "150px",
        headerAlign: "center",
        cellAlign: "center",
      },
    },
  ];

  const registerStatus = [];

  return requestStatus;
};

export default getTableColumns;
