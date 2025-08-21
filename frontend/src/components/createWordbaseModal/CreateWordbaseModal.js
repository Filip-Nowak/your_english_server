import React, { useState } from "react";
import Modal from "../moadal/Modal";
import styles from "./modal.module.scss";
import { createWordbase } from "../../http/userData";
import MenuBtn from "../menuBtn/MenuBtn";

export default function CreateWordbaseModal({ hideModal }) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const onTextChange = (e) => {
    setError("");
    setName(e.target.value);
  };
  const onCreateClick = () => {
    if (name === "") {
      setError("name can't be empty");
      return;
    }
    handleCreate().then((response) => {
      if (response.error) {
        setError(response.message);
        return;
      }
      const url = encodeURI("/wordbase/" + name);
      window.location.href = url;
    });
  };
  const handleCreate = async () => {
    return createWordbase(name);
  };
  return (
    <Modal className={styles.modal} style={{ borderRadius: "4rem" }}>
      <div className={styles.text}>Podaj nazwę słownika</div>
      <div className={styles.error}>{error}</div>
      <div
        style={{
          display: "flex",
          marginTop: "1vh",
          justifyContent: "center",
        }}
      >
        <input
          type="text"
          className={styles.input}
          onChange={onTextChange}
          maxLength={30}
        />
        <div
          onClick={onCreateClick}
          style={{ fontSize: "3rem", marginLeft: "2rem" }}
        >
          <i className="fa-solid fa-arrow-right"></i>
        </div>
      </div>
      <MenuBtn
        text="Anuluj"
        containerStyle={{
          backgroundColor: "#333333",
          color: "white",
          textAlign: "center",
        }}
        onClick={hideModal}
        className={styles.cancelBtn}
      />
    </Modal>
  );
}
