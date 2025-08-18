import React from "react";
import styles from "./mainPage.module.scss";
import Logo from "./Logo";
import TokenContext from "../../context/TokenContext";
export default function PhoneHeader() {
  const tokenContext = React.useContext(TokenContext);
  return (
    <div className={styles.phoneHeader}>
      <div className={styles.accountContainer}></div>
      <Logo phone={true} />
      <div className={styles.accountContainer}>
        {!tokenContext.token ? (
          <div
            className={styles.loginButton}
            onClick={() => (window.location.pathname = "/login")}
          >
            log in
          </div>
        ) : (
          <div
            className={styles.accountIcon}
            onClick={() => (window.location.pathname = "/profile")}
          >
            <i className="fas fa-user"></i>
          </div>
        )}
      </div>
    </div>
  );
}
