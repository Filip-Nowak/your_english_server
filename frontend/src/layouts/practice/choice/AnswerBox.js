import React, { useState } from "react";
import styles from "./choice.module.scss";
import CheckButton from "./CheckButton";
import NextButton from "./NextButton";
export default function AnswerBox({
  answers,
  handleSubmit,
  correct = null,
  handleNext,
}) {
  const [selected, setSelected] = useState(null);
  const handleAnswerClick = (index) => {
    if (correct !== null) return;
    setSelected(index);
  };
  return (
    <div className={styles.answerBox}>
      <div className={styles.question}>co to znaczy?</div>
      <div className={styles.answersContainer}>
        {answers.map((answer, index) => {
          let displayAnswer = answer;
          let extendedable = false;
          if (answer.length > 30) {
            extendedable = true;
            displayAnswer = answer.slice(0, 30) + "...";
          }

          return (
            <div
              key={index}
              className={
                (extendedable ? styles.extendable : "") +
                " " +
                styles.answer +
                " " +
                (correct === null
                  ? selected === index
                    ? styles.selected
                    : ""
                  : index === correct
                  ? styles.correct
                  : index === selected
                  ? styles.wrong
                  : "")
              }
              onClick={() => handleAnswerClick(index)}
            >
              <span className={styles.displayAnswer}>{displayAnswer}</span>
              <div className={styles.extended}>{answer}</div>
            </div>
          );
        })}
      </div>
      {correct === null ? (
        <CheckButton
          disabled={!(selected !== null)}
          onClick={() => {
            handleSubmit(selected);
          }}
        />
      ) : (
        <NextButton
          onClick={() => {
            setSelected(null);
            handleNext();
          }}
        />
      )}
    </div>
  );
}
