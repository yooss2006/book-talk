"use client";

import ProfileIcon from "./profile-icon";
import SearchLink from "./search-link";

import style from "./header-button-group.module.css";
import { usePathname } from "next/navigation";
import ProfileModalButton from "./profile-modal-button";

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
      <ProfileModalButton>
        <ProfileIcon />
      </ProfileModalButton>
    </div>
  );
}
