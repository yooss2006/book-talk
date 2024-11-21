"use client";

import ProfileIcon from "./profile-icon";
import SearchLink from "./search-link";

import style from "./header-button-group.module.css";
import { usePathname } from "next/navigation";

export default function HeaderButtonGroup() {
  const pathname = usePathname();
  return (
    <div className={style.button_group}>
      {(() => {
        switch (pathname) {
          case "/search":
            return null;
          default:
            return <SearchLink />;
        }
      })()}
      <ProfileIcon />
    </div>
  );
}
