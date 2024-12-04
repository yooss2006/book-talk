import { Book } from "@/model/book";
import Image from "next/image";
import Link from "next/link";
import style from "./book-link-item.module.css";
import { formatAuthor } from "@/utils/string";

export default function BookLinkItem(props: Book) {
  const { title, isbn, image, author } = props;
  return (
    <Link href={`/book/${isbn}`} className={style.link} prefetch={false}>
      <Image src={image} width={72} height={112} alt={title} />
      <header className={style.header}>
        <h3 className={style.title}>{title}</h3>
        <p className={style.author}>{formatAuthor(author)}</p>
      </header>
    </Link>
  );
}
