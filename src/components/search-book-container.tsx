"use client";

import { searchBook } from "@/actions/search-book";
import { useActionState } from "react";
import BookLinkItem from "./book-link-item";

export default function SearchBookContainer() {
  const [state, formAction, isPending] = useActionState(searchBook, null);

  return (
    <section>
      <form action={formAction}>
        <input name="query" placeholder="검색어를 입력하세요." />
        <button type="submit" disabled={isPending}>
          검색
        </button>
      </form>
      {state?.items && state.items.length > 0 && (
        <ul>
          {state.items.map((item) => (
            <BookLinkItem key={item.isbn} {...item} />
          ))}
        </ul>
      )}
    </section>
  );
}
