import SearchBookContainer from "@/components/search-book-container";
import style from "./page.module.css";
import { Suspense } from "react";

export default function SearchPage() {
  return (
    <section className={style.section}>
      <h2 className={style.title}>도서 검색</h2>
      <Suspense fallback="로딩중...">
        <SearchBookContainer />
      </Suspense>
    </section>
  );
}
