import React, { useState } from "react";
import Title from "../../components/title/Title";
import styles from "./wordbasesLayout.module.scss";
import { useLoaderData } from "react-router-dom";
import WorrdbaseInfo from "../../components/wordbaseInfo/WordbaseInfo";
import MenuBtn from "../../components/menuBtn/MenuBtn";
import Modal from "../../components/moadal/Modal";
import Input from "../../components/input/Input";
import CreateWordbaseModal from "../../components/createWordbaseModal/CreateWordbaseModal";
export default function WordbasesLayout() {
  const { wordbasesResponse } = useLoaderData();
  const wordbases = wordbasesResponse.data;
  const onCreateWordbaseClick = () => {
    setShowModal(true);
  };
  const hideModal = () => {
    setShowModal(false);
  };
  const [showModal, setShowModal] = useState(false);
  return (
    <div className={styles.wordbasesLayout}>
      <Title>Twoje Śłowniki</Title>
      <div className={styles.wordbasesContainer}>
        {wordbases.length === 0 ? (
          <div className={styles.empty}>Twoje słowniki będą tutaj</div>
        ) : (
          wordbases.map((wordbase) => (
            <WorrdbaseInfo
              key={wordbase.name}
              name={wordbase.name}
              count={wordbase.wordCount}
            />
          ))
        )}
      </div>
      <div className={styles.btnContainer}>
        <MenuBtn
          onClick={onCreateWordbaseClick}
          text="Utwórz słownik"
          icon={<i className="fa-solid fa-plus"></i>}
          className={styles.createWordbaseBtn}
        />
      </div>
      {showModal ? <CreateWordbaseModal hideModal={hideModal} /> : ""}
    </div>
  );
}
