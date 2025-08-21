import React, { useContext, useEffect, useState } from "react";
import QuestWord from "../choice/QuestWord";
import { useLoaderData } from "react-router-dom";
import InsertBox from "./InsertBox";
import FinishButton from "../finshed/FinishButton";
import ShrinkingFontTextarea from "./ShrinkingFontTextarera";
import { BackgroundContext } from "../../../context/BackgroundContext";
import styles from "./insert.module.scss";
export default function InsertLayout({
  word,
  handleNext,
  numberInfo,
  addPoints,
  finishButton,
}) {
  const [correct, setCorrect] = useState(null);
  const [answer, setAnswer] = useState("");
  const { background, setBackground } = useContext(BackgroundContext);
  const handleSubmit = (answer) => {
    const c = checkCorrectness(answer);
    setCorrect(c);
    if (c) {
      addPoints(1, word.wordBaseName);
    } else {
      addPoints(0, word.wordBaseName);
    }
  };
  useEffect(() => {
    setBackground("#00000000");
    return () => {
      setBackground("");
    };
  }, []);
  useEffect(() => {
    if (correct === null) {
      document.body.style.backgroundColor = "white";
    } else if (correct) {
      document.body.style.backgroundColor = "lightgreen";
    } else {
      document.body.style.backgroundColor = "lightcoral";
    }
    return () => {
      document.body.style.backgroundColor = "white";
    };
  }, [correct]);

  const checkCorrectness = (userAnswer) => {
    userAnswer = userAnswer.trim();
    userAnswer = userAnswer.toLowerCase();
    return userAnswer === word.meaning.toLowerCase();
  };

  return (
    <div style={{ backgroundColor: "#00000000" }} className={styles.container}>
      <QuestWord
        className={styles.questWord}
        numberInfo={numberInfo}
        text={word.word}
        containerClass={styles.questWordContainer}
        numberClass={styles.questNumber}
      ></QuestWord>
      <div
        style={{
          color: correct ? "green" : "red",
        }}
        className={styles.resultContainer}
      >
        {correct === null ? null : correct ? "poprawnie" : "niepoprawnie"}
        {correct === false ? (
          <div style={{ fontSize: "1.5rem", color: "black" }}>
            poprawna odpowiedź: {word.meaning}
          </div>
        ) : null}
      </div>
      <InsertBox
        handleSubmit={handleSubmit}
        correct={correct}
        handleNext={(xd) => {
          setCorrect(null);
          handleNext(xd);
        }}
      />
      {finishButton}
    </div>
  );
}
