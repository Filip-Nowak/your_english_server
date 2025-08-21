import React from "react";
import styles from "./choice.module.scss";
export default function NextButton({ onClick }) {
  return (
    <div className={styles.checkBtn + " " + styles.nextBtn} onClick={onClick}>
      <div>dalej</div>
      <i className="fas fa-arrow-right"></i>
    </div>
  );
}
