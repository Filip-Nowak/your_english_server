import React, { useEffect, useRef, useState } from "react";
import FinishedLayout from "../finshed/FinishedLayout";
import { useLoaderData } from "react-router-dom";
import ConnectLayout from "./ConnectLayout";
import FinishButton from "../finshed/FinishButton";

export default function ConnectPractice() {
  const { response } = useLoaderData();
  const quests = response.data;
  const [index, setIndex] = useState(0);
  const [wordbases, setWordbases] = useState([]);
  //   useEffect(() => {
  //     if (index !== quests.length) {
  //       const r = Math.random();
  //       const words = quests[index].map((q) => q.word);
  //       const meanings = quests[index].map((q) => q.meaning);
  //       if (r < 0.5) {
  //         setLeftWords(generateItems(words));
  //         setRightWords(generateItems(meanings));
  //       } else {
  //         setLeftWords(generateItems(meanings));
  //         setRightWords(generateItems(words));
  //       }
  //     }
  //   }, [index]);
  const time = useRef(0);
  const timerRef = useRef(null);
  useEffect(() => {
    timerRef.current = setInterval(() => {
      time.current += 1;
      console.log(time.current);
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, []);
  const handleNext = () => {
    setIndex((prevState) => prevState + 1);
  };
  const addPoints = (points, wordbase) => {
    console.log(points, wordbase);
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
    setIndex(quests.length);
  };
  console.log(wordbases);
  return index === quests.length ? (
    <FinishedLayout
      wordbases={wordbases}
      type={"connect"}
      time={time.current}
    />
  ) : (
    <ConnectLayout
      quest={quests[index]}
      handleNext={handleNext}
      addPoints={addPoints}
      finishButton={
        <FinishButton
          handleClick={handleFinish}
          disabled={index === 0 || index === quests.length - 1}
        />
      }
    />
  );
}
