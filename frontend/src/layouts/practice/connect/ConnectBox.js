import React from "react";
import ConnectItem from "./ConnectItem";
import styles from "./connect.module.scss";
import ConnectColumn from "./ConnectColumn";

export default function ConnectBox({
  leftWords,
  rightWords,
  leftSelected,
  rightSelected,
  handleRightSelect,
  handleLeftSelect,
}) {
  return (
    <div className={styles.connectBox}>
      <ConnectColumn
        words={leftWords}
        selected={leftSelected}
        handleSelect={handleLeftSelect}
      />
      <ConnectColumn
        words={rightWords}
        selected={rightSelected}
        handleSelect={handleRightSelect}
      />
    </div>
  );
}
