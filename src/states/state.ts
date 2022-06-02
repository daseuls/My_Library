import { atom } from "recoil";
import { IBookItem } from "../types";

export const libraryBookListState = atom<IBookItem[] | []>({
  key: "#libraryBookList",
  default: [],
});

export const wishListState = atom<IBookItem[] | []>({
  key: "#wishList",
  default: [],
});
