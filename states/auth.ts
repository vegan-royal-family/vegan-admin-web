import { selector } from "recoil";
import { v1 } from "uuid";
import { UserInfoType } from "types/user";

export const authSelector = selector({
  key: `authState/get/${v1()}`,
  get: async (): Promise<UserInfoType> => {
    // TODO: 프로필 데이터 가져오기
    try {
      return {
        profileImage: null,
        name: "테스트",
        userId: "test",
        email: "email@gmail.com",
      };
    } catch (err) {
      throw err;
    }
  },
});
