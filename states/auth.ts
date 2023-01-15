import { atom, selector } from "recoil";
import { v1 } from "uuid";

type UserInfo = {
  id: number;
  authorization: Array<string>;
  profileImage: string;
  name: string;
};

const defaultSelector = selector({
  key: `authSelector/${v1()}`,
  get: async ({ get }): Promise<UserInfo> => {
    // TODO: 프로필 API로 데이터 가져오기
    return {
      profileImage: null,
      name: "미확인 사용자 1",
      id: null,
      authorization: null,
    };
  },
});

export const authState = atom({
  key: `auth/${v1()}`,
  default: defaultSelector,
});
