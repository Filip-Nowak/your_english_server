import React, { useState } from "react";
import NavButton from "./NavButton";
import styles from "./mainPage.module.scss";
import UserInfo from "./UserInfo";
import NavList from "./NavList";
import TokenContext from "../../context/TokenContext";
export default function Navigation({ wordbases, user }) {
  const [expanded, setExpanded] = useState(false);
  const tokenContext = React.useContext(TokenContext);
  const locked = !tokenContext.token;
  return (
    <div className={styles.navigation}>
      <div className={styles.buttonContainer}>
        <NavButton
          name="Home"
          icon={<i className="fa-solid fa-house"></i>}
          path=""
        />
        <NavButton
          path={"practice"}
          name="ćwicz"
          icon={<i className="fa-solid fa-pen-to-square"></i>}
          locked={locked}
        />

        <NavButton
          name="śłowniki"
          icon={<i className="fa-solid fa-list"></i>}
          path="wordbases"
          locked={locked}
          className={styles.wordbasesButton}
        />
        <NavList
          name="słowniki"
          arr={wordbases}
          expanded={expanded}
          setExpanded={setExpanded}
          locked={locked}
        />
      </div>
      <div className={styles.bottom}>
        <UserInfo user={user} />
      </div>
    </div>
  );
}
