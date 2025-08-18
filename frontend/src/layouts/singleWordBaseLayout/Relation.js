import React from "react";
import styles from "./layout.module.scss";
export default function Relation({ number, word, meaning, handleDelete }) {
  if (word.length >= 15) {
    word = word.slice(0, 15) + "...";
  }
  if (meaning.length >= 15) {
    meaning = meaning.slice(0, 15) + "...";
  }
  return (
    <div key={word} className={styles.relation}>
      <div className={styles.number}>{number}</div>
      <div className={styles.word}>{word}</div>
      <div className={styles.meaning}>{meaning}</div>
      <div
        className={styles.delete}
        onClick={(e) => {
          e.stopPropagation();
          handleDelete(number);
        }}
      >
        <i className="fa-solid fa-trash"></i>
      </div>
    </div>
  );
}
