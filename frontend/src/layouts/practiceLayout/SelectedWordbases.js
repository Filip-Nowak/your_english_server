import React, { useState } from "react";
import MenuBtn from "../../components/menuBtn/MenuBtn";
import styles from "./practice.module.scss";
import WordbaseElement from "./WordbaseElement";
import WordbaseModal from "./WordbaseModal";
import { useLoaderData } from "react-router-dom";
export default function SelectedWordbases({
  modeSelected,
  selectedWordbases,
  setSelectedWordbases,
  handleStart,
}) {
  const [adding, setAdding] = useState(false);
  const data = useLoaderData();
  const wordbases = data.wordbasesResponse.data;
  const handleAdd = () => {
    setAdding(true);
  };
  const handleCancel = () => {
    setAdding(false);
  };
  const addWordbase = (wordbase) => {
    setSelectedWordbases([...selectedWordbases, wordbase]);
    setAdding(false);
  };
  const handleDelete = (wordbase) => {
    setSelectedWordbases(
      selectedWordbases.filter(
        (selectedWordbase) => selectedWordbase !== wordbase
      )
    );
  };
  console.log(wordbases);
  return (
    <div>
      <div className={styles.container}>
        <div style={{ fontSize: "2rem", textAlign: "center", color: "#555" }}>
          Wybierz śłowniki do ćwiczenia
        </div>
        <div className={styles.wordbasesContainer}>
          {selectedWordbases.length === 0 ? (
            <div>Nie wybrano żadnych słowników</div>
          ) : (
            selectedWordbases.map((wordbase) => (
              <WordbaseElement
                key={wordbase.id}
                name={wordbase}
                handleDelete={handleDelete}
              />
            ))
          )}
        </div>
        <div style={{ display: "flex" }}>
          <MenuBtn
            className={styles.addBtn}
            icon={
              <i style={{ fontSize: "2rem" }} className="fa-solid fa-plus"></i>
            }
            text="dodaj słownik"
            onClick={handleAdd}
          />
          <MenuBtn
            onClick={handleStart}
            text={"rozpocznij"}
            className={styles.startBtn}
            icon={
              <i style={{ fontSize: "2rem" }} className="fa-solid fa-play"></i>
            }
            disabled={!(selectedWordbases.length > 0 && modeSelected)}
          />
        </div>
      </div>

      {adding ? (
        <WordbaseModal
          handleCancel={handleCancel}
          wordbases={wordbases.filter(
            (wordbase) =>
              !selectedWordbases.includes(wordbase.name) &&
              wordbase.wordCount >= 20
          )}
          addWordbase={addWordbase}
        />
      ) : null}
    </div>
  );
}
