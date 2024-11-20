import SearchBookContainer from "@/components/search-book-container";
import style from "./page.module.css";

export default function SearchPage() {
  return (
    <section>
      <h2 className={style.title}>도서 검색</h2>
      <SearchBookContainer />
    </section>
  );
}
