import React from "react";
import styles from "./practice.module.scss";
export default function ModeButton({ name, icon, onClick, selected }) {
  return (
    <div
      className={styles.mode}
      onClick={onClick}
      style={selected ? { borderColor: "lime" } : {}}
    >
      <div className={styles.checkIconContainer}>
        {selected ? (
          <i style={{ color: "lime" }} className="fa-solid fa-circle-check"></i>
        ) : (
          <i className="fa-regular fa-circle"></i>
        )}
      </div>
      <div
        className={styles.modeIcon}
        style={{
          color: selected ? "green" : "black",
        }}
      >
        {icon}
      </div>
      <div className={styles.modeName}>{name}</div>
    </div>
  );
}
