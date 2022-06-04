export interface IBookItem {
  isbn: string;
  title: string;
  thumbnail: string;
  authors: string[];
  startDate?: Date;
  endDate?: Date | null;
  color: string;
  datetime?: Date;
  contents?: string;
  price?: number;
  publisher?: string;
  sale_price?: number;
  status?: string;
  translators?: string[] | [];
  url?: string;
}

export interface IParams {
  search: string;
  sort: string;
  start?: number;
}
