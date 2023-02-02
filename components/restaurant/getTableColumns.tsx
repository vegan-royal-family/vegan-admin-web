import theme from "styles/theme";

const INSPECTION_STATUS = {
  todo: "할일",
  inprogress: "진행",
  approved: "승인",
  rejected: "거부",
};

const BUTTON_STYLE = {
  default: {
    background: "#fff",
    color: `${theme.palette.colors.gray[900]}`,
  },
  inprogress: {
    background: `${theme.palette.status.warning[500]}`,
    color: "#fff",
  },
  approved: {
    background: `${theme.palette.status.success[700]}`,
    color: "#fff",
  },
  rejected: {
    background: `${theme.palette.status.danger[700]}`,
    color: "#fff",
  },
};

const DetailButton = ({ tabId, status, onPopupOpen }) => {
  let title: string;
  let style: Object;
  if (tabId === 0) {
    title = "조회";
  } else {
    title = INSPECTION_STATUS[status];
    style = BUTTON_STYLE[status];
  }

  return (
    <button
      type="button"
      onClick={() => onPopupOpen("detail", status)}
      style={style ?? BUTTON_STYLE.default}
    >
      {title}
    </button>
  );
};

const getTableColumns = (tabId, onPopupOpen: Function) => {
  const columns = [
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
      cellRender: (data) => (
        <DetailButton
          tabId={tabId}
          status={data?.status}
          onPopupOpen={onPopupOpen}
        />
      ),
      options: {
        width: "150px",
        headerAlign: "center",
        cellAlign: "center",
      },
    },
  ];

  return columns;
};

export default getTableColumns;
