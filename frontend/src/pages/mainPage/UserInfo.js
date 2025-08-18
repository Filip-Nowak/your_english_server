import React from "react";
import styles from "./mainPage.module.scss";
import TokenContext from "../../context/TokenContext";
export default function UserInfo({ user }) {
  let name = null;
  if (user !== null) {
    name = user.data.username;
    if (name.length > 8) {
      name = name.slice(0, 7) + "...";
    }
  }
  console.log(name);
  const tokenContext = React.useContext(TokenContext);
  return (
    <>
      <div className={styles.userData}>
        {name === null ? (
          <div
            className={styles.sidebarLogIn}
            onClick={() => (window.location.pathname = "/login")}
          >
            <i className="fa-solid fa-user"></i>
            <div>Log in</div>
          </div>
        ) : (
          <>
            <div
              className={styles.userIcon}
              onClick={() => (window.location.pathname = "/profile")}
            >
              <i className="fa-solid fa-user"></i>
              <div>{name}</div>
            </div>
          </>
        )}
      </div>
      <div
        className={styles.userSingleIcon}
        onClick={() => {
          if (name === null) {
            window.location.pathname = "/login";
          } else {
            window.location.pathname = "/profile";
          }
        }}
      >
        {name === null ? (
          <span>log in</span>
        ) : (
          <i className="fa-solid fa-user"></i>
        )}
      </div>
    </>
  );
}
