import React, { useContext, useEffect, useState } from "react";
import Title from "../../components/title/Title";
import { useLoaderData } from "react-router-dom";
import styles from "./layout.module.scss";
import WordsContainer from "./WordsContainer";
import LoadingContext from "../../context/LoadingContext";
import {
  addRelation,
  deleteRelation,
  fetchData,
  getWordbase,
  updateRelation,
} from "../../http/userData";
export default function SingleWordBaseLayout() {
  const [selectedRelation, setSelectedRelation] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const { wordbaseResponse } = useLoaderData();
  const [editing, setEditing] = useState(false);
  const loadingContext = useContext(LoadingContext);
  if (wordbaseResponse.error) {
    window.location.href = "/wordbases";
    return;
  }
  const handleItemClick = (index) => {
    console.log(index);
    setEditing((prevEditing) => {
      console.log(prevEditing);
      if (!prevEditing) setSelectedRelation(index);
      return prevEditing;
    });
  };

  const handleBackgroundClick = () => {
    setEditing((prevEditing) => {
      if (!prevEditing) setSelectedRelation(null);
      return prevEditing;
    });
  };
  const handleUpdate = (word, meaning, number) => {
    loadingContext.setLoading(true);
    updateRelation(wordbase.name, number, word, meaning).then((data) => {
      loadingContext.setLoading(false);
      if (data.error) {
        console.log(data.error);
        return;
      }
      setEditing(false);
      setSelectedRelation(null);
    });
    wordbase.relations[number - 1].word = word;
    wordbase.relations[number - 1].meaning = meaning;
    setEditing(false);
    setSelectedRelation(null);
  };
  const handleAdd = (word, meaning) => {
    if (word === "" || meaning === "") return;
    loadingContext.setLoading(true);
    addRelation(wordbase.name, word.trim(), meaning.trim()).then((data) => {
      loadingContext.setLoading(false);
      if (data.error) {
        console.log(data.error);
        return;
      }
      setEditing(false);
      wordbase.relations.push({ word: word, meaning: meaning });
    });
  };
  const handleDelete = (number) => {
    console.log("delete");
    loadingContext.setLoading(true);
    deleteRelation(wordbase.name, number).then((data) => {
      loadingContext.setLoading(false);
      if (data.error) {
        console.log(data.error);
        return;
      }
      wordbase.relations.splice(number - 1, 1);
    });
  };
  const wordbase = wordbaseResponse.data;
  return (
    <div style={{ width: "100%" }} onClick={handleBackgroundClick}>
      <Title>{wordbase.name}</Title>
      <div className={styles.subtitle}>słownik</div>
      <WordsContainer
        editing={editing}
        setEditing={setEditing}
        relations={wordbase.relations}
        selectedRelation={selectedRelation}
        setSelectedRelation={handleItemClick}
        handleUpdate={handleUpdate}
        addRelation={handleAdd}
        handleDelete={handleDelete}
      />
    </div>
  );
}
