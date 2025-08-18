import React, { useRef, useState } from "react";
import styles from "./insert.module.scss";
export default function FlexibleInput({
  content,
  setContent,
  disabled,
  correct,
}) {
  const textareaRef = useRef(null);
  const defaultFontSize = useRef(null);
  const handleChange = (e) => {
    if (disabled) return;
    const value = e.target.value;
    const lineHeight =
      parseInt(
        window.getComputedStyle(defaultFontSize.current).lineHeight,
        10
      ) || 20;
    const contentLines = Math.floor(
      textareaRef.current.scrollHeight / lineHeight
    );
    const className = "input" + contentLines;
    textareaRef.current.className = styles[className];
    setContent(e.target.value);
  };
  return (
    <>
      <div className={styles.defaultFontsize} ref={defaultFontSize}></div>
      <textarea
        className={styles.input}
        type="text"
        value={content}
        onChange={handleChange}
        ref={textareaRef}
        style={{
          backgroundColor:
            correct === null ? "white" : correct ? "lightgreen" : "lightcoral",
        }}
      />
    </>
  );
}
