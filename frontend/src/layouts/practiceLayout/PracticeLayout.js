import React, { useState } from "react";
import Title from "../../components/title/Title";
import SelectedWordbases from "./SelectedWordbases";
import ModeSelector from "./ModeSelector";
import styles from "./practice.module.scss";

export default function PracticeLayout() {
  const [selectedMode, setSelectedMode] = useState(null);
  const [selectedWordbases, setSelectedWordbases] = useState([]);
  const modes = [
    {
      name: "fiszki",
      icon: <i className="fa-solid fa-clone"></i>,
      urlName: "flashcards",
    },
    {
      name: "Wielokrotny wybór",
      icon: <i className="fa-solid fa-list"></i>,
      urlName: "choice",
    },
    {
      name: "Wstaw odpowiedź",
      icon: <i className="fa-solid fa-pen-to-square"></i>,
      urlName: "insert",
    },
    {
      name: "Połącz",
      icon: <i className="fa-solid fa-link"></i>,
      urlName: "connect",
    },
    {
      name: "Losowy",
      icon: <i className="fa-solid fa-random"></i>,
      urlName: "random",
    },
  ];
  const handleStart = () => {
    let params = "";
    selectedWordbases.forEach((wordbase) => {
      params += `w=${wordbase}&`;
    });
    params = params.slice(0, -1);
    window.location.href = `/practice/${modes[selectedMode].urlName}?${params}`;
  };
  return (
    <div style={{ width: "100%" }}>
      <Title className={styles.title}>Ćwiczenia</Title>

      <SelectedWordbases
        modeSelected={selectedMode !== null}
        setSelectedWordbases={setSelectedWordbases}
        selectedWordbases={selectedWordbases}
        handleStart={handleStart}
      />
      <ModeSelector
        selectedMode={selectedMode}
        setSelectedMode={setSelectedMode}
        modes={modes}
      />
    </div>
  );
}
