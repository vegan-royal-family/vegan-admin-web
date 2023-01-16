import Table from "components/common/Table";
import Icon from "components/common/Icon";
import range from "utils/range";

export default {
  title: "components/Table",
  component: Table,
};

const Template = (args) => {
  return (
    <div style={{ padding: "15px 20px" }}>
      <Table {...args} />
    </div>
  );
};

const columns = [
  {
    Header: "닉네임",
    accessor: "nickname",
    options: {
      useSort: true,
    },
  },
  {
    Header: "유형",
    accessor: "vegetarianType",
    options: {
      width: "80px",
      useSort: true,
    },
  },
  {
    Header: "성별",
    accessor: "gender",
    options: {
      width: "80px",
      useSort: true,
    },
  },
  {
    Header: "생년월일",
    accessor: "birth",
    options: {
      width: "120px",
      useSort: true,
    },
  },
  {
    Header: "SNS",
    accessor: "snsType",
    options: {
      width: "80px",
      useSort: true,
    },
  },
  {
    Header: "가입일시",
    accessor: "createdAt",
    options: {
      width: "160px",
      useSort: true,
    },
  },
  {
    Header: "처리 이력",
    cellRender: (data) => {
      return (
        <button
          type="button"
          onClick={() => alert(`${data.nickname} 처리 이력 오픈!`)}
        >
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
      const buttonEnabled = (data?.warningCount ?? 0) > 2;
      return (
        <div>
          <button>경고</button>
          <button disabled={!buttonEnabled}>비활성화</button>
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

const getData = (len) => {
  return range(len).map((id) => {
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
};

export const AdminTable = Template.bind({});
AdminTable.args = {
  id: "test-table",
  columns,
  data: getData(90),
  useSelection: true,
  fetchData: (sortOption) => {
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
  },
};
