import React from "react";
import styles from "./menuBtn.module.scss";
export default function MenuBtn({
  onClick,
  text,
  icon = null,
  height = "",
  width = "",
  fontSize = "",
  containerStyle = {},
  textStyle = {},
  disabled = false,
  className = "",
}) {
  let wordCount = text.split(" ").length;
  let textsize = fontSize;
  if (wordCount === 1) {
    if (text.length > 5) {
      textsize = 30 / text.length;
    }
  }
  const handleClick = () => {
    if (!disabled) onClick();
  };
  return (
    <div
      className={styles.container + " " + className}
      onClick={handleClick}
      style={{
        height: height,
        width: width,
        ...containerStyle,
        opacity: disabled ? 0.5 : 1,
      }}
    >
      {icon === null ? "" : <div className={styles.icon}>{icon}</div>}

      <div
        className={styles.text}
        style={{
          lineHeight: "3rem",
          width: icon === null ? "100%" : "70%",
          fontSize: fontSize,
          ...textStyle,
        }}
      >
        {text}
      </div>
    </div>
  );
}
