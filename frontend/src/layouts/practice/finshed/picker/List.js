import React from "react";
import styles from "./picker.module.scss";
export default function List({ wordbases, handleSelect, selected }) {
  return (
    <div className={styles.list}>
      {wordbases.map((wordbase, index) => {
        const percentage = Math.floor(
          (wordbase.score / wordbase.maxScore) * 100
        );
        return (
          <div
            key={index}
            className={
              styles.item + (index === selected ? " " + styles.selected : "")
            }
            onClick={() => handleSelect(index)}
          >
            <div>{wordbase.name}</div>
            <div
              style={{
                color:
                  percentage < 50
                    ? "red"
                    : percentage < 75
                    ? "yellow"
                    : percentage < 100
                    ? "green"
                    : "lime",
              }}
            >
              {percentage}%
            </div>
          </div>
        );
      })}
    </div>
  );
}
