import React from "react";

export default function Input({
  width,
  height,
  fontSize,
  placeholder = "",
  style = {},
}) {
  return (
    <input
      type="text"
      style={{ width: width, height: height, fontSize: fontSize, ...style }}
      placeholder={placeholder}
    />
  );
}
