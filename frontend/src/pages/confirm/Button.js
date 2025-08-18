import React from "react";
import styles from "./confirm.module.css";
export default function Button({ message, handleClick }) {
  return (
    <div className={styles.button} onClick={handleClick}>
      {message}
    </div>
  );
}
