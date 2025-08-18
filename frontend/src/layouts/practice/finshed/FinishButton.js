import React from "react";
import styles from "./finished.module.scss";
export default function FinishButton({ handleClick, disabled }) {
  return (
    <div
      className={
        styles.finishButton + " " + (disabled ? styles.disabledBtn : "")
      }
      onClick={() => {
        if (!disabled) handleClick();
      }}
    >
      Zakończ
    </div>
  );
}
