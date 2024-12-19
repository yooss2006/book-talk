"use client";

import { ReactNode, useReducer } from "react";
import styles from "./profile-modal-button.module.css";
import LogoutButton from "./logout-button";

type ModalProps = {
  closeModal: () => void;
};

function ProfileModal({ closeModal }: ModalProps) {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={closeModal}>
          ×
        </button>
        <div className={styles.modalContent}>
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}

type Props = {
  children: ReactNode;
};

export default function ProfileModalButton({ children }: Props) {
  const [isOpen, toggleIsOpen] = useReducer((state) => {
    return !state;
  }, false);

  return (
    <>
      <button className={styles.modalButton} onClick={toggleIsOpen}>
        {children}
      </button>
      {isOpen && <ProfileModal closeModal={toggleIsOpen} />}
    </>
  );
}
