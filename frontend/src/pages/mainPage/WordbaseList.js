import React from "react";
import styles from "./mainPage.module.scss";
export default function WordbaseList({ wordbases }) {
  return (
    <div className={styles.listContainer}>
      {wordbases.map((wordbase) => {
        return (
          <div
            key={wordbase}
            className={styles.wordbase}
            onClick={() => {
              window.location.pathname = `/wordbase/${wordbase}`;
            }}
          >
            <div>{wordbase}</div>
          </div>
        );
      })}
    </div>
  );
}
