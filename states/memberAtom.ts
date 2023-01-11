import { atom, selector } from "recoil";
import { v1 } from "uuid";

export const myNameState = atom({
  key: `myNameState/${v1()}`,
  default: "hyojin",
});

// export const myNameSelector = selector({
//   key: "myNameSelector",
//   get: ({ get }) => {
//     const data = get(myNameState);
//     return data;
//   },
// });
