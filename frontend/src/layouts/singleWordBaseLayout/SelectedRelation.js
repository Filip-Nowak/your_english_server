import React, { useContext, useState } from "react";
import styles from "./layout.module.scss";
import LoadingContext from "../../context/LoadingContext";
import { updateRelation } from "../../http/userData";
import AutoResizingTextarea from "./AutoResizingTextarea";
export default function SelectedRelation({
  number,
  baseWord = "",
  baseMeaning = "",
  editing = false,
  setEditing,
  setSelectedRelation,
  handleUpdate,
}) {
  const [meaning, setMeaning] = useState(baseMeaning);
  const [word, setWord] = useState(baseWord);
  const wordRef = React.useRef(null);
  const meaningRef = React.useRef(null);
  const onMeaningChange = (e) => {
    if (meaning === baseMeaning && word === baseWord) setEditing(false);
    else setEditing(true);
    setMeaning((prevState) => {
      prevState = e.target.value;
      if (prevState === baseMeaning && word === baseWord) setEditing(false);
      else setEditing(true);
      return prevState;
    });
  };
  const onWordChange = (e) => {
    setWord((prevState) => {
      prevState = e.target.value;
      if (meaning === baseMeaning && prevState === baseWord) setEditing(false);
      else setEditing(true);
      return prevState;
    });
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className={styles.relation}
      style={{ backgroundColor: "#222222" }}
    >
      <div className={styles.number}>{number}</div>
      <AutoResizingTextarea
        cls={styles.input + " " + styles.word}
        onChange={onWordChange}
        value={word}
      />
      <AutoResizingTextarea
        cls={styles.input + " " + styles.meaning}
        onChange={onMeaningChange}
        value={meaning}
      />

      {editing && (
        <div className={styles.acceptContainer}>
          <div
            style={{ color: "green" }}
            onClick={() => {
              handleUpdate(word, meaning, number);
            }}
          >
            <i className="fa-solid fa-check"></i>
          </div>
          <div
            style={{ color: "red" }}
            onClick={(e) => {
              e.stopPropagation();
              setEditing(false);
              setSelectedRelation(null);
            }}
          >
            <i className="fa-solid fa-xmark"></i>
          </div>
        </div>
      )}
    </div>
  );
}
