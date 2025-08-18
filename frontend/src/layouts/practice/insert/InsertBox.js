import React, { useState } from "react";
import styles from "./insert.module.scss";
import FlexibleInput from "./FlexibleInput";
import ShrinkingFontTextarea from "./ShrinkingFontTextarera";
export default function InsertBox({ handleSubmit, correct, handleNext }) {
  const [answer, setAnswer] = useState("");
  return (
    <div className={styles.insertBox}>
      <ShrinkingFontTextarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        disabled={correct !== null}
        onSubmit={() => {
          if (answer === "") return;
          handleSubmit(answer);
        }}
      />

      {correct === null ? (
        <div
          className={
            styles.submit + " " + (answer === "" ? styles.disabled : "")
          }
          onClick={(e) => {
            if (answer === "") return;
            handleSubmit(answer);
          }}
        >
          zatwierdź
        </div>
      ) : (
        <div
          className={styles.submit}
          onClick={(e) => {
            setAnswer("");
            handleNext();
          }}
        >
          dalej
        </div>
      )}
    </div>
  );
}
