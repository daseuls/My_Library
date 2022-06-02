import { atom } from "recoil";
import { IBookItem } from "../types";

export const libraryBookListState = atom<IBookItem[] | []>({
  key: "#libraryBookList",
  default: [],
});
