import { useRef, useEffect, useState } from "react";
import styles from "./insert.module.scss";
export default function ShrinkingFontTextarea({
  value,
  onChange,
  disabled,
  onSubmit,
}) {
  const textareaRef = useRef(null);
  const [defaultFont, setDefaultFont] = useState(1);
  useEffect(() => {
    const defaultFontSize = window.getComputedStyle(
      textareaRef.current
    ).fontSize;
    setDefaultFont(parseFloat(defaultFontSize));
  }, []);
  const handleChange = (e) => {
    if (disabled) return;
    const inputValue = e.target.value;
    const lelttersCount = inputValue.length;
    let newFontSize = defaultFont;
    if (lelttersCount > 20) {
      newFontSize = Math.max(
        defaultFont * (1 - lelttersCount / 100),
        0.5 * defaultFont
      );
    }
    console.log(newFontSize);
    textareaRef.current.style.fontSize = `${newFontSize}px`;
    onChange(e);
  };
  const handleKeyDown = (e) => {
    if (disabled) return;
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (onSubmit) onSubmit();
    }
  };
  return (
    <textarea
      className={styles.textarea}
      ref={textareaRef}
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      placeholder="Wpisz odpowiedź..."
      maxLength={110}
    />
  );
}
