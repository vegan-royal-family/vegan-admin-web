import Layout from "components/common/Layout";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { myNameState } from "states/memberAtom";

export default function MemberManagementPage() {
  // const [myName, setMyName] = useRecoilState(myNameState);
  // const setMyName = useSetRecoilState(myNameState)
  const myName = useRecoilValue(myNameState);

  return <Layout>여기는 {myName} 회원 관리</Layout>;
}

/*
export async function getServerSideProps(context) {
  return {
    props: {}, // Will be passed to the page component as props
  };
}
*/
