import React from "react";
import Percentage from "./Percentage";
import styles from "./finished.module.scss";
export default function Score({ score, maxScore }) {
  const percentage = Math.floor((score / maxScore) * 1000) / 10;
  let red, green, color;
  if (percentage > 50) {
    let m = maxScore / 2;
    let x = score - m;
    let p = x / m;
    green = p * 255;
    red = 255 - green;
    color = `rgb(${red}, ${green}, 0)`;
  } else {
    color = "red";
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        height: "fit-content",
      }}
    >
      <Percentage percentage={percentage} color={color} />
      <div className={styles.normalScore}>
        <div>punkty:</div>
        <div>
          <span>{score}</span> / {maxScore}
        </div>
      </div>
    </div>
  );
}
