import React from "react";
import styles from "./mainPage.module.scss";
import TokenContext from "../../context/TokenContext";
export default function NavButton({ name, icon, path, locked, className }) {
  const selectedBtn = window.location.pathname.split("/")[1] === path;
  const handleClick = () => {
    if (locked) {
      return;
    }
    window.location.pathname = path;
  };
  return (
    <>
      <div
        onClick={handleClick}
        className={
          className +
          " " +
          styles.navBtn +
          " " +
          (selectedBtn ? styles.selectedBtn : "") +
          (locked ? " " + styles.locked : "")
        }
      >
        <div className={styles.navBtnContent}>
          <div
            className={styles.iconContainer}
            style={{ color: locked ? "#737373" : "" }}
          >
            {icon}
          </div>
          <div
            style={{ color: locked ? "#737373" : "" }}
            className={styles.nameContainer}
          >
            {name}
          </div>
        </div>
        {locked ? (
          <i className={"fa-solid fa-lock" + " " + styles.lockedIcon}></i>
        ) : null}
        <div className={styles.singleIcon}>{icon}</div>
      </div>
    </>
  );
}
