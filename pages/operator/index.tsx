import range from "utils/range";
import styled from "@emotion/styled";
import usePopup from "utils/usePopup";
import OperatorForm from "components/operator/Form";
import Layout from "components/common/Layout";
import Table from "components/common/Table";
import AddPersonIcon from "assets/icon/add_person.svg";
import getTableColumns from "components/operator/getTableColumns";

const ToolbarWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 16px 0 46px;
`;

const IconBox = styled.div`
  width: 32px;
  height: 32px;
  box-sizing: border-box;
  padding-left: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #1a5fb7;
  border-radius: 50%;
  cursor: pointer;
  user-select: none;
`;

type PopupType = "detail" | "create";

export default function OperatorPage({ data }) {
  const { popupOption, onPopupOpen, onPopupClose } = usePopup<PopupType>();
  const columns = getTableColumns(onPopupOpen);

  return (
    <Layout>
      {popupOption?.visible && popupOption?.type === "detail" && (
        <OperatorForm visible={popupOption?.visible} onClose={onPopupClose} />
      )}
      <ToolbarWrapper>
        <IconBox>
          <AddPersonIcon />
        </IconBox>
      </ToolbarWrapper>
      <Table
        id="operator-management-table"
        columns={columns}
        data={JSON.parse(data)}
      />
    </Layout>
  );
}

export function getServerSideProps(_context) {
  const res = range(50).map((id) => {
    return {
      id: id,
      name: `관리자${id}`,
      userId: "admin",
      team: "총괄",
      role: "서비스총괄",
      job_duty: "채식 콘텐츠 관리 및 서비스 운영",
      phone: "010-1111-2222",
      authorizations: "최고관리자 / 등록, 수정, 삭제",
    };
  });
  const data = JSON.stringify(res);

  return {
    props: { data }, // will be passed to the page component as props
  };
}
