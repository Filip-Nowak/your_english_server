import React from "react";
import styles from "./choice.module.scss";
export default function QuestWord({
  numberInfo,
  numberClass,
  text,
  className,
  containerClass,
}) {
  let displayText = text;
  let extendable = false;
  if (text.length > 20) {
    extendable = true;
    displayText = text.slice(0, 20) + "...";
  }
  return (
    <div className={styles.questWordContainer}>
      <div
        className={
          containerClass +
          " " +
          styles.quest +
          " " +
          (extendable ? styles.extendable : "")
        }
      >
        <span className={className + " " + styles.questText}>
          {displayText}
        </span>
        <div className={styles.extended}>{text}</div>
      </div>
      <div className={styles.questNumber + " " + numberClass}>{numberInfo}</div>
    </div>
  );
}
