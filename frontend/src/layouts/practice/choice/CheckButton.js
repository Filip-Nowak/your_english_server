import React from "react";
import styles from "./choice.module.scss";
export default function CheckButton({ onClick, disabled }) {
  const handleClick = () => {
    if (!disabled) onClick();
  };
  return (
    <div
      onClick={handleClick}
      style={{ opacity: disabled ? "0.5" : "1" }}
      className={styles.checkBtn}
    >
      check
    </div>
  );
}
