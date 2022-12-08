import Table from "../components/manage/Table";

export default {
  title: "components/Table",
  component: Table,
};

const Template = (args) => {
  return <Table {...args} />;
};

const columns = [
  {
    Header: "닉네임",
    accessor: "nickname",
    options: {
      align: "start",
    },
  },
  {
    Header: "유형",
    accessor: "vegetarianType",
    options: {
      width: "80px",
    },
  },
  {
    Header: "성별",
    accessor: "gender",
    options: {
      width: "80px",
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
      width: "80px",
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
    Header: "수신 동의",
    cellRender: (data) => {
      // <AlarmIcon />;
      return <div />;
    },
    options: {
      width: "100px",
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
    },
  },
  {
    Header: "관리",
    // headerRender: () => {
    //   return <FaceIcon />;
    // },
    cellRender: (data) => {
      // 경고, 비활성화 버튼
      // 경고 2회가 넘은 사람만 비활성화 버튼이 활성화됨
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
    },
  },
];

export const AdminTable = Template.bind({});
AdminTable.args = {
  columns,
  data: [
    {
      id: 1,
      nickname: `꽈뚜루빠뚜루밥밥디라라-${1}`,
      vegetarianType: "폴로",
      gender: "male",
      birth: "2001-04-11",
      snsType: "카카오",
      createdAt: "2022-12-31 23:47:58",
      useNotification: true,
      warningCount: 0,
    },
  ],
};
