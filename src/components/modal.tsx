"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import style from "./modal.module.css";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

export default function Modal({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
      dialogRef.current?.scrollTo({
        top: 0,
      });
    }
  }, [mounted]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <dialog
      onClose={() => router.back()}
      onClick={(e: React.MouseEvent<HTMLDialogElement>) => {
        // 모달의 배경("DIALOG")이 클릭이된거면 -> 뒤로가기
        if (e.target instanceof HTMLDialogElement) {
          router.back();
        }
      }}
      className={style.modal}
      ref={dialogRef}
    >
      {children}
    </dialog>,
    document.getElementById("modal-root") as HTMLElement
  );
}
