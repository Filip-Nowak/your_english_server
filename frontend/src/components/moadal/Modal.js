import React, { useEffect } from "react";
import styles from "./modal.module.css";

export default function Modal({
  children,
  height,
  width,
  style = {},
  className = "",
}) {
  useEffect(() => {
    // blokujemy scroll
    document.body.style.overflow = "hidden";

    // przy odmontowaniu modala odblokowujemy
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className={styles.background}>
      <div
        className={className + " " + styles.container}
        style={{ height: height, width: width, ...style }}
      >
        {children}
      </div>
    </div>
  );
}
