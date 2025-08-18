import React from "react";
import styles from "./title.module.scss";
export default function Title({ children, style = {}, className = "" }) {
  return (
    <div className={styles.container + " " + className} style={style}>
      {children}
    </div>
  );
}
