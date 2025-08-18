import React, { useEffect, useState } from "react";
import styles from "./connect.module.scss";
import ConnectItem from "./ConnectItem";
export default function ConnectColumn({ words, handleSelect, selected }) {
  return (
    <div className={styles.column}>
      {words.map((word, index) => (
        <ConnectItem
          key={index}
          item={word}
          selected={index === selected}
          onClick={() => {
            if (word.checked) return;
            handleSelect(index);
          }}
        />
      ))}
    </div>
  );
}
