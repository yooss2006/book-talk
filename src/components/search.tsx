"use client";

import { useRouter } from "next/navigation";
import style from "./search.module.css";
import { useState } from "react";

export default function Search() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?q=${query}`);
    setQuery("");
  };

  return (
    <form onSubmit={handleSearch} className={style.search_container}>
      <input
        value={query}
        onChange={({ target: { value } }) => setQuery(value)}
        placeholder="검색어를 입력하세요."
        className={style.input}
      />
      <button type="submit" className={style.submit_button}>
        검색
      </button>
    </form>
  );
}
