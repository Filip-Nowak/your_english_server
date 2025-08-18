import React, { useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router-dom";
import FinishedLayout from "../finshed/FinishedLayout";
import InsertLayout from "./InsertLayout";
import FinishButton from "../finshed/FinishButton";

export default function InsertPractice() {
  const { response } = useLoaderData();
  const words = response.data;
  const [word, setWord] = useState(words[0]);
  const [wordbases, setWordbases] = useState([]);
  const [index, setIndex] = useState(0);
  const time = useRef(0);
  const timerRef = useRef(null);
  const handleNext = () => {
    setIndex(index + 1);
  };
  useEffect(() => {
    if (index !== words.length) {
      const r = Math.random();
      if (r < 0.5) {
        setWord(words[index]);
      } else {
        setWord({
          word: words[index].meaning,
          meaning: words[index].word,
          wordBaseName: words[index].wordBaseName,
        });
      }
    }
  }, [index]);
  useEffect(() => {
    timerRef.current = setInterval(() => {
      time.current += 1;
      console.log(time.current);
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, []);
  const addPoint = (points, wordbase) => {
    console.log(wordbase);
    setWordbases((prevState) => {
      for (let i = 0; i < prevState.length; i++) {
        if (prevState[i].name === wordbase) {
          prevState[i].score += points;
          prevState[i].maxScore += 1;
          return [...prevState];
        }
      }
      prevState.push({ name: wordbase, maxScore: 1, score: points });
      return [...prevState];
    });
  };
  const handleFinish = () => {
    clearInterval(timerRef.current);
    setIndex(words.length);
  };
  const finishButton = (
    <FinishButton
      handleClick={handleFinish}
      disabled={index === 0 || index === words.length - 1}
    />
  );

  return index === words.length ? (
    <FinishedLayout wordbases={wordbases} time={time.current} type="insert" />
  ) : (
    <InsertLayout
      word={word}
      handleNext={handleNext}
      addPoints={addPoint}
      finishButton={finishButton}
      numberInfo={index + 1 + "/" + words.length}
    />
  );
}
