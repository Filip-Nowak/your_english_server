import React, { useEffect, useState } from "react";
import styles from "./layout.module.scss";
import Relation from "./Relation";
import MenuBtn from "../../components/menuBtn/MenuBtn";
import SelectedRelation from "./SelectedRelation";
export default function WordsContainer({
  relations,
  selectedRelation,
  setSelectedRelation,
  editing,
  setEditing,
  handleUpdate,
  addRelation,
  handleDelete,
}) {
  const listRef = React.createRef(null);
  const [adding, setAdding] = useState(false);
  const onAddClick = () => {
    setSelectedRelation(null);
    setEditing(true);
    setAdding(true);
  };
  useEffect(() => {
    if (listRef.current && adding) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
    setAdding(false);
  }, [adding, listRef]);
  return (
    <div className={styles.wordsContainer}>
      <div className={styles.listHeader}>
        <div style={{ marginLeft: "20%", width: "25%" }}>słowo</div>
        <div style={{ marginLeft: "10%", width: "25%" }}>znaczenie</div>
      </div>
      <div
        className={styles.listContainer}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div className={styles.list} ref={listRef}>
          {relations.length === 0 && (
            <div style={{ color: "#333", fontSize: "2rem", marginTop: "2rem" }}>
              No words in this wordbase
            </div>
          )}
          {relations.map((relation, i) => {
            return selectedRelation === i ? (
              <SelectedRelation
                key={i + 1}
                baseMeaning={relation.meaning}
                baseWord={relation.word}
                number={i + 1}
                editing={editing}
                setEditing={setEditing}
                setSelectedRelation={setSelectedRelation}
                handleUpdate={handleUpdate}
              />
            ) : (
              <div
                key={i + 1}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedRelation(i);
                }}
              >
                <Relation
                  {...relation}
                  number={i + 1}
                  handleDelete={handleDelete}
                />
              </div>
            );
          })}
          {editing && selectedRelation === null && (
            <SelectedRelation
              key={relations.length + 1}
              number={relations.length + 1}
              editing={editing}
              setEditing={setEditing}
              setSelectedRelation={setSelectedRelation}
              handleUpdate={addRelation}
            />
          )}
        </div>
      </div>
      <div className={styles.buttons}>
        <MenuBtn
          disabled={editing}
          onClick={onAddClick}
          text="dodaj słowo"
          icon={<i className="fa-solid fa-plus"></i>}
          className={styles.button}
        />
        {relations.length >= 20 ? (
          <MenuBtn
            text="ćwicz"
            icon={<i className="fa-solid fa-pen-to-square"></i>}
            onClick={() => {
              window.location.href =
                "/practice?wordbase=" + window.location.href.split("/")[4];
            }}
            className={styles.button}
          />
        ) : (
          <div
            style={{
              width: "30vh",
              marginRight: "15%",
              textAlign: "center",
              marginTop: "2vh",
              fontSize: "1.2rem",
            }}
          >
            Musisz mieć przynajmniej 20 relacji, aby ćwiczyć
          </div>
        )}
      </div>
    </div>
  );
}
