import React from "react";
import styles from "./finished.module.scss";

export default function Percentage({ percentage, color }) {
  return (
    <div className={styles.scorePercentage}>
      <div>wynik: </div>
      <div
        className={styles.percentage}
        style={{
          color: color,
        }}
      >
        {percentage} %
      </div>
    </div>
  );
}
