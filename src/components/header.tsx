import style from "./header.module.css";
import HeaderButtonGroup from "./\bheader-button-group";

export default function Header() {
  return (
    <header className={style.header}>
      <h1>북토크에 오신 것을 환영합니다.</h1>
      <HeaderButtonGroup />
    </header>
  );
}
