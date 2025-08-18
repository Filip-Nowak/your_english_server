import React, { useState } from "react";
import styles from "./mainPage.module.scss";
import WordbaseList from "./WordbaseList";

export default function NavList({ arr, name, expanded, setExpanded, locked }) {
  const handleClick = () => {
    if (locked) {
      return;
    }
    window.location.pathname = "/wordbases";
  };
  return (
    <div
      className={
        styles.navListContainerParent + " " + (locked ? styles.locked : "")
      }
    >
      <div
        style={expanded ? { backgroundColor: "#333333" } : {}}
        className={styles.navListContainer}
      >
        <div
          onClick={() => handleClick()}
          style={
            locked
              ? {}
              : window.location.pathname === "/wordbases"
              ? {}
              : { color: "white" }
          }
          className={
            styles.navListButton +
            " " +
            (window.location.pathname === "/wordbases"
              ? styles.selectedBtn
              : "")
          }
        >
          <div style={{ display: "flex", width: "80%" }}>
            <div style={{ marginLeft: "1rem" }}>
              <i className="fa-solid fa-list"></i>
            </div>
            <div style={{ marginLeft: "1rem" }}>{name}</div>
          </div>
          <div
            style={{
              textAlign: "center",
              width: "20%",
            }}
          >
            {locked ? (
              <i
                className="fa-solid fa-lock"
                style={{ color: "#737373", fontSize: "1.5rem" }}
              ></i>
            ) : (
              <i
                onClick={(e) => {
                  setExpanded(!expanded);
                  e.stopPropagation();
                }}
                style={{
                  textAlign: "center",
                }}
                className={
                  expanded
                    ? "fa-solid fa-chevron-up"
                    : "fa-solid fa-chevron-down"
                }
              ></i>
            )}
          </div>
        </div>
        {expanded && <WordbaseList wordbases={arr} />}
      </div>
    </div>
  );
}
