export interface IBookItem {
  isbn: string;
  title: string;
  thumbnail: string;
  authors: string[];
}

export interface IParams {
  search: string;
  sort: string;
  start?: number;
}
