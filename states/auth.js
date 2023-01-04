import { atom, selector } from "recoil";

// 로그인시
// 1. 로그인을 해서 profile 데이터를 받는다.
// 2. 받은 데이터를 auth 스토어에 저장한다.
// 3. 관리자 페이지로 리다이렉션한다.

const defaultSelector = selector({
  key: "mySelector",
  get: async ({ get }) => {
    // TODO: 프로필 API로 데이터 가져오기
    return {
      profile_image: null,
      name: "미확인 사용자 1",
      id: null,
      authorization: null,
    };
  },
});

export const authState = atom({
  key: "auth",
  default: defaultSelector,
});

/*
export const authorizationSelector = selector({
  key: "authorizationSelector",
  get: ({ get }) => {
    const data = get(authState);
    return data;
  },
});
*/
