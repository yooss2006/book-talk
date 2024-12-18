import { getSavedBooks } from "@/api/get-saved-books";
import BookLinkItem from "@/components/book-link-item";
import styles from "./page.module.css";

export default async function Home() {
  const books = (await getSavedBooks()) || [];

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>최근 열람한 책</h2>
      <p className={styles.description}>
        최근 많은 독자들이 관심을 가진 도서입니다.
      </p>
      <ul role="list" className={styles.book_list}>
        {books.map((book) => (
          <li key={book.isbn}>
            <BookLinkItem {...book} />
          </li>
        ))}
      </ul>
    </div>
  );
}
