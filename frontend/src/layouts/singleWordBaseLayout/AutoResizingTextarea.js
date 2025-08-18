import { useEffect, useRef, useState } from "react";

export default function AutoResizingTextarea({ value, onChange, cls }) {
  const textareaRef = useRef(null);

  const resizeTextarea = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  };

  useEffect(() => {
    resizeTextarea();
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={onChange}
      placeholder="Wpisz coś..."
      className={cls}
      rows={1}
      style={{ overflow: "hidden", resize: "none" }}
      maxLength={100}
    />
  );
}
