import React from "react";
import styles from "./mainPage.module.scss";
import Logo from "./Logo";
import Navigation from "./Navigation";
export default function SideBar({ wordbases, user }) {
  console.log(user);
  return (
    <>
      <div className={styles.fakeSidebar + " " + styles.desktop}>
        <div className={styles.sidebar}>
          <Logo />
          <Navigation wordbases={wordbases} user={user} />
        </div>
      </div>

      <div className={styles.phone}>
        <Navigation wordbases={[]} user={user} />
      </div>
    </>
  );
}
