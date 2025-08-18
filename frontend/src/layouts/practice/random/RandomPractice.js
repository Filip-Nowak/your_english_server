import React, { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import InsertLayout from "../insert/InsertLayout";
import ConnectLayout from "../connect/ConnectLayout";
import MultipleChoiceLayout from "../choice/MultipleChoiceLayout";
import FinishedLayout from "../finshed/FinishedLayout";
import FinishButton from "../finshed/FinishButton";
import { startRandom } from "../../../http/practice";
import { randomLoader } from "../../../utils/loaders/loaders";
import LoadingContext from "../../../context/LoadingContext";

export default function RandomPractice() {
  const { response } = useLoaderData();
  const [mode, setMode] = useState(response.data.mode);
  const [quest, setQuest] = useState(response.data.quest);
  const [number, setNumber] = useState(1);
  const [wordbases, setWordbases] = useState([]);
  const laodingContext = useContext(LoadingContext);

  const handleNext = () => {
    laodingContext.setLoading(true);
    getNextQuest().then((res) => {
      if (res) {
        console.log(res);
        const data = res.response.data;
        console.log(data);
        setQuest(data.quest);
        setNumber((prevState) => prevState + 1);
        setMode(data.mode);
      } else {
        setMode("finished");
      }
      laodingContext.setLoading(false);
    });
  };
  const getNextQuest = async () => {
    return await randomLoader();
  };
  const addPoints = (points, wordbaseName) => {
    console.log(wordbaseName);
    setWordbases((prevState) => {
      for (let i = 0; i < prevState.length; i++) {
        if (prevState[i].name === wordbaseName) {
          prevState[i].score += points;
          prevState[i].maxScore += 1;
          return [...prevState];
        }
      }
      prevState.push({ name: wordbaseName, maxScore: 1, score: points });
      return [...prevState];
    });
  };
  const handleFinish = () => {
    setMode(null);
  };
  return mode === "insert" ? (
    <InsertLayout
      word={quest}
      handleNext={handleNext}
      numberInfo={number}
      addPoints={addPoints}
      finishButton={
        <FinishButton handleClick={handleFinish} disabled={number === 1} />
      }
    />
  ) : mode === "connect" ? (
    <ConnectLayout
      quest={quest}
      handleNext={handleNext}
      addPoints={addPoints}
      finishButton={
        <FinishButton handleClick={handleFinish} disabled={number === 1} />
      }
    />
  ) : mode === "choice" ? (
    <MultipleChoiceLayout
      quest={quest}
      numberInfo={number}
      handleNext={handleNext}
      addPoints={addPoints}
      finishButton={
        <FinishButton handleClick={handleFinish} disabled={number === 1} />
      }
    />
  ) : (
    <FinishedLayout wordbases={wordbases} time={50} type={"random"} />
  );
}
