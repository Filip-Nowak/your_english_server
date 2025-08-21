import React, { useEffect } from "react";
import ModeButton from "./ModeButton";
import styles from "./practice.module.scss";
export default function ModeSelector({ modes, selectedMode, setSelectedMode }) {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          marginTop: "2vh",
        }}
      >
        {modes.map((mode, i) => (
          <ModeButton
            onClick={() => {
              setSelectedMode(i);
            }}
            name={mode.name}
            icon={mode.icon}
            selected={i === selectedMode}
            key={i}
          />
        ))}
      </div>
      <div className={styles.mobileModeSelector}>
        <MobileLoader setSelectedMode={setSelectedMode} />
        <select
          value={selectedMode !== null ? selectedMode : ""}
          onChange={(e) => {
            setSelectedMode(parseInt(e.target.value));
          }}
          className={styles.modeSelector}
        >
          {modes.map((mode, i) => (
            <option key={i} value={i} className={styles.modeSelectorOption}>
              {mode.name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

function MobileLoader({ setSelectedMode }) {
  useEffect(() => {
    setSelectedMode(0);
  }, [setSelectedMode]);

  return null;
}
