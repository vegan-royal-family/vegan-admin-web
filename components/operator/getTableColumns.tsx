import Icon from "components/common/Icon";

const getTableColumns = (onPopupOpen: Function) => [
  {
    Header: "이름",
    accessor: "name",
    options: {
      width: "120px",
    },
  },
  {
    Header: "ID",
    accessor: "userId",
    options: {
      width: "160px",
    },
  },
  {
    Header: "소속",
    accessor: "team",
    options: {
      width: "160px",
    },
  },
  {
    Header: "직책",
    accessor: "role",
    options: {
      width: "160px",
    },
  },
  {
    Header: "직무",
    accessor: "job_duty",
  },
  {
    Header: "연락처",
    accessor: "phone",
    options: {
      width: "160px",
    },
  },
  {
    Header: "권한",
    accessor: "authorizations",
    options: {
      width: "240px",
    },
  },
  {
    Header: "관리",
    headerRender: () => {
      return <Icon icon="attention" size="sm" />;
    },
    cellRender: (data) => {
      return (
        <div>
          <button type="button" onClick={() => onPopupOpen("detail")}>
            수정
          </button>
          <button type="button" onClick={() => onPopupOpen("delete")}>
            삭제
          </button>
        </div>
      );
    },
    options: {
      width: "160px",
      headerAlign: "center",
      cellAlign: "center",
    },
  },
];

export default getTableColumns;
