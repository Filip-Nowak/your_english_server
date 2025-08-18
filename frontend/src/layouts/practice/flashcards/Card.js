import React, { useState } from "react";
import styles from "./flashcards.module.scss";
export default function Card({ word, meaning }) {
  const [flipped, setFlipped] = useState(false);
  const handleClick = () => {
    setFlipped((prevState) => !prevState);
  };
  return (
    <div
      className={`${styles.cardContainer} ${flipped ? styles.flipped : ""}`}
      onClick={handleClick}
    >
      <div className={styles.card}>
        <div className={styles.cardFront}>{word}</div>
        <div className={styles.cardBack}>{meaning}</div>
      </div>
    </div>
  );
}
