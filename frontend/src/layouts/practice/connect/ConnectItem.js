import React from "react";
import styles from "./connect.module.scss";
export default function ConnectItem({ item, onClick, selected }) {
  let size = "";
  if (item.word.length > 30) {
    size = "50%";
  }
  return (
    <div
      style={{ fontSize: size }}
      className={
        styles.item +
        " " +
        (item.checked ? styles.checked : "") +
        " " +
        (selected ? styles.selected : "")
      }
      onClick={onClick}
    >
      {item.word}
    </div>
  );
}
