import React from "react";
import styles from "./practice.module.scss";
export default function WordbaseElement({ name, handleDelete }) {
  return (
    <div className={styles.element}>
      <div style={{}}>{name}</div>
      <i
        style={{ paddingLeft: "1rem" }}
        onClick={() => {
          handleDelete(name);
        }}
        className="fa-solid fa-xmark"
      ></i>
    </div>
  );
}
