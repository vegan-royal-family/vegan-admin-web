import Icon from "components/common/Icon";

const getTableColumns = (onPopupOpen: Function) => {
  return [
    {
      Header: "닉네임",
      accessor: "nickname",
    },
    {
      Header: "유형",
      accessor: "vegetarianType",
      options: {
        width: "100px",
      },
    },
    {
      Header: "성별",
      accessor: "gender",
      options: {
        width: "100px",
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
        width: "100px",
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
        width: "160px",
        headerAlign: "center",
        cellAlign: "center",
      },
    },
  ];
};

export default getTableColumns;
