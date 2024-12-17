export interface ResponseSearchBook {
  display: number;
  start: number;
  total: number;
  lastBuildDate: string;
  items: Array<Book>;
}

export interface Book {
  title: string;
  link: string | null;
  image: string;
  author: string;
  discount: string | null;
  publisher: string | null;
  pubdate: string | null;
  isbn: string;
  description: string | null;
}
