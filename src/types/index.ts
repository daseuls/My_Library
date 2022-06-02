export interface IBookItem {
  isbn: string;
  title: string;
  thumbnail: string;
  authors: string[];
  startDate?: string;
  endDate?: string;
}

export interface IParams {
  search: string;
  sort: string;
  start?: number;
}
