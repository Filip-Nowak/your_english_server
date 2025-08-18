import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Title from "../../../components/title/Title";
import ConnectBox from "./ConnectBox";
import styles from "./connect.module.scss";

export default function ConnectLayout({
  quest,
  handleNext,
  addPoints,
  finishButton,
}) {
  const [leftWords, setLeftWords] = useState([]);
  const [rightWords, setRightWords] = useState([]);
  const [leftSelected, setLeftSelected] = useState(null);
  const [rightSelected, setRightSelected] = useState(null);
  const [finished, setFinished] = useState(0);
  console.log(finished);
  useEffect(() => {
    if (leftSelected !== null && rightSelected !== null) {
      const left = leftWords[leftSelected];
      const right = rightWords[rightSelected];
      if (left.id === right.id) {
        left.checked = true;
        right.checked = true;
        setLeftSelected(null);
        setRightSelected(null);
        setFinished((prevState) => prevState + 1);
        handleCorrect();
      } else {
        setLeftSelected(null);
        setRightSelected(null);
        handleIncorrect();
      }
    }
  }, [leftSelected, rightSelected]);
  useEffect(() => {
    const r = Math.random();
    const words = quest.map((q) => q.word);
    const wbNames = quest.map((q) => q.wordBaseName);
    const meanings = quest.map((q) => q.meaning);
    if (r < 0.5) {
      setLeftWords(
        generateItems(words, wbNames).sort(() => Math.random() - 0.5)
      );
      setRightWords(
        generateItems(meanings, wbNames).sort(() => Math.random() - 0.5)
      );
    } else {
      setLeftWords(
        generateItems(meanings, wbNames).sort(() => Math.random() - 0.5)
      );
      setRightWords(
        generateItems(words, wbNames).sort(() => Math.random() - 0.5)
      );
    }
    setFinished(0);
  }, [quest]);
  const handleLeftSelect = (index) => {
    setLeftSelected(index);
  };
  const handleRightSelect = (index) => {
    setRightSelected(index);
  };

  const generateItem = (name, id, wbName) => {
    return {
      id: id,
      word: name,
      checked: false,
      value: 1,
      wordbase: wbName,
    };
  };
  const generateItems = (names, wbNames) => {
    return names.map((name, index) =>
      generateItem(name, index, wbNames[index])
    );
  };

  const handleCorrect = () => {
    const leftItem = leftWords[leftSelected];
    const rightItem = rightWords[rightSelected];
    const points = leftItem.value + rightItem.value;
    const wordbase = leftItem.wordbase;
    addPoints(points / 2, wordbase);
  };
  const handleIncorrect = () => {
    setLeftWords((prevState) => {
      prevState[leftSelected].value = 0;
      return [...prevState];
    });
    setRightWords((prevState) => {
      prevState[rightSelected].value = 0;
      return [...prevState];
    });
  };
  return (
    <div style={{ width: "100%" }} className={styles.container}>
      <Title style={{ opacity: "0.8" }}>Połącz słowa</Title>

      <ConnectBox
        leftWords={leftWords}
        rightWords={rightWords}
        leftSelected={leftSelected}
        rightSelected={rightSelected}
        handleLeftSelect={handleLeftSelect}
        handleRightSelect={handleRightSelect}
      />
      <div
        onClick={() => {
          if (finished === quest.length) {
            handleNext();
          }
        }}
        className={
          styles.nextBtn +
          " " +
          (finished !== quest.length ? styles.nextDisabled : "")
        }
      >
        Dalej
      </div>
      {finishButton}
    </div>
  );
}
