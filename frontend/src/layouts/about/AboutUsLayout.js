import { useEffect } from "react";
import styles from "./aboutUs.module.scss";
import ExampleBox from "./ExampleBox";
import { fetchData } from "../../http/userData";
import { useNavigate } from "react-router-dom";
function AboutUsLayout() {
  const navigate = useNavigate();
  const modes = [
    {
      name: "fiszki",
      icon: <i className="fa-solid fa-clone"></i>,
      urlName: "flashcards",
    },
    {
      name: "wielokrotny wybór",
      icon: <i className="fa-solid fa-list"></i>,
      urlName: "choice",
    },
    {
      name: "wpisz odpowiedź",
      icon: <i className="fa-solid fa-pen-to-square"></i>,
      urlName: "insert",
    },
    {
      name: "połącz",
      icon: <i className="fa-solid fa-link"></i>,
      urlName: "connect",
    },
  ];
  return (
    <div className={styles.container}>
      <div className={styles.header}>O nas</div>
      <div className={styles.description}>
        Your English to platforma zaprojektowana, aby pomóc Ci w nauce i
        ćwiczeniu języka angielskiego, szczególnie słownictwa. Możesz tworzyć
        własne bazy słów, czyli zbiory słówek i zwrotów, które chcesz opanować.
        Następnie możesz ćwiczyć te słowa poprzez różne tryby, takie jak fiszki,
        wybór z listy, wpisywanie odpowiedzi i inne. Platforma jest przyjazna
        użytkownikowi i pozwala skupić się na nauce słówek, które są dla Ciebie
        ważne.
      </div>
      <div className={styles.header} style={{ marginTop: "5vh" }}>
        Przykład
      </div>
      <ExampleBox
        examples={[
          {
            text: "Utwórz bazę słów z wybranymi słówkami, np. 'Zwierzęta'",
            image: "example1.png",
          },
          {
            text: "Ćwicz z fiszkami",
            image: "example2.png",
          },
          {
            text: "Rozwiązuj quizy, aby sprawdzić swoją wiedzę",
            image: "example3.png",
          },
        ]}
      />

      <div className={styles.tryContainer}>
        <div className={styles.tryText}>
          Wypróbuj nasze narzędzia ćwiczeniowe na przykładowym słowniku
        </div>

        <div className={styles.tryButtonsContainer}>
          {modes.map((mode, index) => (
            <div
              key={index}
              className={styles.tryButton}
              onClick={() => {
                navigate(`/example/${mode.urlName}`);
              }}
            >
              {mode.icon} {mode.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AboutUsLayout;
