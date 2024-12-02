"use client";

import { useEffect, useRef, useState } from "react";
import BookLinkItem from "./book-link-item";

import style from "./search-book-container.module.css";
import { Book, ResponseSearchBook } from "@/model/book";
import Search from "./search";
import { useSearchParams } from "next/navigation";
import { getBooks } from "@/api/get-books";

const useIntersectionObserver = ({
  items,
  itemsRef,
  nextPage,
  setNextPage,
}: {
  items: Array<Book>;
  itemsRef: React.MutableRefObject<Array<HTMLLIElement | null>>;
  nextPage: number;
  setNextPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  useEffect(() => {
    const callback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          const targetIndex = parseInt(target.dataset.index!);
          const targetPage = Math.floor(targetIndex / 10) + 2;
          if (nextPage === 1 || nextPage < targetPage) setNextPage(targetPage);
        }
      });
    };

    const observer = new IntersectionObserver(callback, { threshold: 0.1 });

    itemsRef.current.forEach((item) => {
      if (item) observer.observe(item);
    });

    return () => {
      observer.disconnect();
    };
  }, [itemsRef, nextPage, setNextPage, items]);
};

export default function SearchBookContainer() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q");

  const [items, setItems] = useState<Array<Book>>([]);
  const [lastSearchItem, setLastSearchItem] =
    useState<ResponseSearchBook | null>(null);
  const [nextPage, setNextPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadedPages, setLoadedPages] = useState<Set<number>>(new Set());

  const itemsRef = useRef<Array<HTMLLIElement | null>>([]);

  useIntersectionObserver({ itemsRef, nextPage, setNextPage, items });

  useEffect(() => {
    if (!q) return;
    console.log("여기!");

    setNextPage(1);
    setItems([]);
    setLastSearchItem(null);
    setIsLoading(true);
    getBooks({ q })
      .then((res) => {
        if (res) {
          setLastSearchItem(res);
          setItems(res.items);
          setLoadedPages(new Set([1]));
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [q]);

  useEffect(() => {
    if (!q || nextPage <= 1 || isLoading) return;

    const total = lastSearchItem?.total || 1;
    const display = lastSearchItem?.display || 1;
    const ablePage = Math.ceil(total / display);

    if (ablePage >= nextPage && !loadedPages.has(nextPage)) {
      setIsLoading(true);
      getBooks({ q, page: nextPage })
        .then((res) => {
          if (res) {
            setLastSearchItem(res);
            setItems((prev) => [...prev, ...res.items]);
            setLoadedPages((prev) => new Set(prev).add(nextPage));
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [nextPage, q, lastSearchItem, isLoading, loadedPages]);

  return (
    <div className={style.search_book_container}>
      <Search />
      {items.length === 0 && !isLoading && (
        <p className={style.guide_text}>검색 결과가 없습니다.</p>
      )}
      {items.length > 0 && (
        <>
          <ul className={style.book_list} role="list">
            {items.map((item, index) => {
              const isEvery7thIndex = (index + 1) % 10 === 8;
              return (
                <li
                  key={`${item.isbn}-${index}`}
                  data-index={index}
                  ref={(el) => {
                    itemsRef.current[index] = isEvery7thIndex ? el : null;
                  }}
                >
                  <BookLinkItem {...item} />
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}
