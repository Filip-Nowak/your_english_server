import React from "react";
import styles from "./wordbaseInfo.module.scss";
import { deleteWordbase } from "../../http/userData";
export default function WordbaseInfo({ name, count }) {
  const handleDelete = () => {
    deleteWordbase(name).then(() => {
      window.location.reload();
    });
  };
  const onClick = () => {
    window.location.href = `/wordbase/${name}`;
  };
  let displayName = name;
  if (name.length > 20) {
    displayName = name.slice(0, 20) + "...";
  }
  return (
    <div className={styles.container}>
      <div onClick={onClick} style={{ width: "90%", display: "flex" }}>
        <div className={styles.name}>{displayName}</div>
        <div className={styles.count}>słowa: {count}</div>
      </div>
      <div className={styles.delete} onClick={handleDelete}>
        <i className="fa-solid fa-trash"></i>
      </div>
    </div>
  );
}
