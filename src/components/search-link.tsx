import Image from "next/image";
import Link from "next/link";
import style from "./search-link.module.css";

export default function SearchLink() {
  return (
    <Link href="/search" className={style.link}>
      <Image src="/icon/search.svg" width={24} height={24} alt="검색" />
    </Link>
  );
}
