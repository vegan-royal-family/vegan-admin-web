import gql from "graphql-tag";
import { useQuery as useGraphqlQuery } from "@apollo/react-hooks";
import { useQuery } from "react-query";

const USERS_QUERY = gql`
  {
    users {
      id
      name
      status
    }
  }
`;

export const useMemberList = () => {
  const fetch = () => {
    const { error, data } = useGraphqlQuery(USERS_QUERY);

    if (error) {
      throw error;
    }
    return data;
  };

  const { isLoading, isError, data, error } = useQuery("users", fetch, {
    refetchOnWindowFocus: false, // react-query는 사용자가 사용하는 윈도우가 다른 곳을 갔다가 다시 화면으로 돌아오면 이 함수를 재실행합니다. 그 재실행 여부 옵션 입니다.
    retry: 0, // 실패시 재호출 몇번 할지
    onSuccess: (data) => {
      // 성공시 호출
      console.log(data);
    },
    onError: (e) => {
      // 실패시 호출 (401, 404 같은 error가 아니라 정말 api 호출이 실패한 경우만 호출됩니다.)
      // 강제로 에러 발생시키려면 api단에서 throw Error 날립니다.
      console.log(e.message);
    },
  });

  return { isLoading, isError, error, data };
};
