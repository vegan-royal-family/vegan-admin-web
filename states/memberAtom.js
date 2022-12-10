import { atom, selector } from "recoil";

export const myNameState = atom({
  key: "myNameState",
  default: "hyojin",
});

export const myNameSelector = selector({
  key: "myNameSelector",
  get: ({ get }) => {
    const data = get(myNameState);
    return data;
  },
});
