"use client";

import { searchBook } from "@/actions/search-book";
import { useActionState } from "react";
import BookLinkItem from "./book-link-item";

import style from "./search-book-container.module.css";

export default function SearchBookContainer() {
  const [state, formAction, isPending] = useActionState(searchBook, null);

  return (
    <div className={style.search_book_container}>
      <form action={formAction} className={style.search_container}>
        <input
          name="query"
          placeholder="검색어를 입력하세요."
          className={style.input}
        />
        <button
          type="submit"
          disabled={isPending}
          className={style.submit_button}
        >
          검색
        </button>
      </form>
      {state?.items && state.items.length === 0 && (
        <p className={style.guide_text}>검색 결과가 없습니다.</p>
      )}
      {state?.items && state.items.length > 0 && (
        <ul className={style.book_list}>
          {state.items.map((item) => (
            <BookLinkItem key={item.isbn} {...item} />
          ))}
        </ul>
      )}
    </div>
  );
}
