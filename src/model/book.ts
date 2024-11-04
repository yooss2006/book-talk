export interface ResponseSearchBook {
  dispatch: number;
  start: number;
  total: number;
  lastBuildDate: string;
  items: Array<Book>;
}

export interface Book {
  title: string;
  link: string;
  image: string;
  author: string;
  discount: string;
  publisher: string;
  pubdate: string;
  isbn: string;
  description: string;
}
