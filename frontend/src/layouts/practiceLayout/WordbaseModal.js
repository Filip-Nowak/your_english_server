import React from "react";
import Modal from "../../components/moadal/Modal";
import styles from "./practice.module.scss";
import MenuBtn from "../../components/menuBtn/MenuBtn";
export default function WordbaseModal({
  wordbases,
  handleCancel,
  addWordbase,
}) {
  return (
    <Modal style={{ borderRadius: "2rem" }}>
      <div className={styles.modal}>
        <div className={styles.modalTitle}>Wybierz słownik</div>
        <div className={styles.list}>
          {wordbases.map((wordbase, index) => (
            <div
              key={index}
              className={styles.pick}
              onClick={() => {
                addWordbase(wordbase.name);
              }}
            >
              {wordbase.name}
            </div>
          ))}
        </div>
        <MenuBtn
          icon={
            <i style={{ fontSize: "2rem" }} className="fa-solid fa-xmark"></i>
          }
          text="Anuluj"
          onClick={handleCancel}
          className={styles.cancelBtn}
        />
      </div>
    </Modal>
  );
}
