import React from "react";
import styles from "./finished.module.scss";
import Score from "./Score";
import Time from "./Time";
export default function ScoreInfo({ score, time, maxScore }) {
  return (
    <div className={styles.results}>
      <div className={styles.header}>wyniki</div>
      <div className={styles.scoreContainer}>
        <Score score={score} maxScore={maxScore} />
        <Time time={time} />
      </div>
    </div>
  );
}
