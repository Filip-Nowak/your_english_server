import React, { useEffect } from "react";
import Title from "../../../components/title/Title";
import styles from "./finished.module.scss";
import WordbasePicker from "./picker/WordbasePicker";
import ScoreInfo from "./ScoreInfo";
import MenuBtn from "../../../components/menuBtn/MenuBtn";
export default function FinishedLayout({ type, time, wordbases }) {
  console.log(wordbases);
  let maxScore = 0;
  wordbases.forEach((wordbase) => {
    maxScore += wordbase.maxScore;
  });
  let score = 0;
  wordbases.forEach((wordbase) => {
    score += wordbase.score;
  });
  const handleRetry = () => {
    document.location.reload();
  };
  const handleHome = () => {
    document.location.href = "/";
  };
  const handleEdit = () => {
    document.location.href = "/practice" + window.location.search;
  };

  const route = window.location.pathname.split("/");
  let isExample = false;
  if (route[1] === "example") {
    isExample = true;
  }

  return (
    <div style={{ width: "100%" }}>
      <Title>Finished</Title>
      <div className={styles.type}>tryb: {type}</div>
      <div className={styles.infoContainer}>
        <ScoreInfo score={score} time={time} maxScore={maxScore} />
        <WordbasePicker wordbases={wordbases} />
      </div>
      <div className={styles.buttonContainer}>
        <MenuBtn
          onClick={handleRetry}
          text={"powtórz"}
          icon={<i className={"fas fa-redo-alt " + styles.icon}></i>}
          className={styles.btn}
        />

        <MenuBtn
          disabled={isExample}
          onClick={handleEdit}
          text={"powrót"}
          icon={<i className="fa-solid fa-pen-to-square"></i>}
          className={styles.btn}
        />

        <MenuBtn
          onClick={handleHome}
          text={"home"}
          icon={<i className={"fa fa-home " + styles.icon}></i>}
          className={styles.btn}
        />
      </div>
    </div>
  );
}
