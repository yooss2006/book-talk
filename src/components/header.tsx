import style from "./header.module.css";
import HeaderButtonGroup from "./\bheader-button-group";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className={style.header}>
      <h1>
        <Link href="/">
          <Image src="/logo.svg" width={40} height={40} alt="북토크" />
        </Link>
      </h1>
      <HeaderButtonGroup />
    </header>
  );
}
