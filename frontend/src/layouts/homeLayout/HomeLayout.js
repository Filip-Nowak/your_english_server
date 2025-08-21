import React, { useState } from "react";
import Title from "../../components/title/Title";
import styles from "./homeLayout.module.scss";
import CreateWordbaseModal from "../../components/createWordbaseModal/CreateWordbaseModal";
import TokenContext from "../../context/TokenContext";
import PublicHomeLayout from "./PublicHomeLayout";
import HomeBtn from "./HomeBtn";
export default function HomeLayout() {
  const [modal, setModal] = useState(false);
  const tokenContext = React.useContext(TokenContext);
  const onPracticeClick = () => {
    window.location.href = "/practice";
  };
  const onWordbasesClick = () => {
    window.location.href = "/wordbases";
  };
  const onCreateWordbaseClick = () => {
    setModal(true);
  };
  const onSettingsClick = () => {
    window.location.href = "/profile";
  };

  return (
    <div>
      {tokenContext.token ? (
        <>
          <Title>strona główna</Title>
          <div className={styles.buttonsContainer}>
            <HomeBtn
              onClick={onPracticeClick}
              text="ćwicz"
              icon={<i className="fa-solid fa-pen-to-square"></i>}
            />
            <HomeBtn
              onClick={onWordbasesClick}
              text="twoje śłowniki"
              icon={<i className="fa-solid fa-list"></i>}
            />
            <HomeBtn
              onClick={onCreateWordbaseClick}
              text="utwórz słownik"
              icon={<i className="fa-solid fa-plus"></i>}
            />
            <HomeBtn
              onClick={onSettingsClick}
              text="konto"
              icon={<i className="fa-solid fa-gear"></i>}
            />
          </div>
          <div style={{ textAlign: "center", width: "100%" }}>
            <a href="/about">o nas</a>
          </div>
          {modal ? (
            <CreateWordbaseModal hideModal={() => setModal(false)} />
          ) : (
            ""
          )}
        </>
      ) : (
        <PublicHomeLayout />
      )}
    </div>
  );
}
