import ProfileIcon from "./profile-icon";
import style from "./header.module.css";
import SearchLink from "./search-link";

export default function Header() {
  return (
    <header className={style.header}>
      <h1>북토크에 오신 것을 환영합니다.</h1>
      <div className={style.button_group}>
        <SearchLink />
        <ProfileIcon />
      </div>
    </header>
  );
}
