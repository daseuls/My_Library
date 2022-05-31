export interface IBookItem {
  isbn: string;
  title: string;
  thumbnail: string;
}

export interface IParams {
  search: string;
  sort: string;
  start?: number;
}
