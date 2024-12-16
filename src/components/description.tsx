"use client";

import { useState } from "react";

import styles from "./description.module.css";

export default function Description({ text }: { text: string }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <p
      className={`${styles.description} ${isExpanded ? styles.expanded : ""}`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {text}
      {text.length > 100 && (
        <span className={styles.readMore}>
          {isExpanded ? "접기" : "더보기"}
        </span>
      )}
    </p>
  );
}
