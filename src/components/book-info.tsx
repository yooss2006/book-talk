import { Book } from "@/model/book";
import styles from "./book-info.module.css";
import Image from "next/image";
import { formatAuthor } from "@/utils/string";
import MainChatRoomLink from "./main-chat-room-link";

export default function BookInfo(book: Book) {
  const { title, author, publisher, image, pubdate, isbn, description } = book;

  return (
    <div className={styles.container}>
      <Image
        className={styles.image}
        src={image}
        width={300}
        height={400}
        alt={title}
      />
      <h2 className={styles.title}>{title}</h2>
      <dl className={styles.dl}>
        <dt>저자</dt>
        <dd>{formatAuthor(author)}</dd>
        <dt>출판사</dt>
        <dd>{publisher}</dd>
        <dt>출판일</dt>
        <dd>{pubdate}</dd>
        <dt>isbn</dt>
        <dd>{isbn}</dd>
      </dl>
      <pre className={styles.description}>{description}</pre>
      <MainChatRoomLink isbn={isbn} book={book} />
    </div>
  );
}
