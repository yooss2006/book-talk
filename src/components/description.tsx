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
    </p>
  );
}
