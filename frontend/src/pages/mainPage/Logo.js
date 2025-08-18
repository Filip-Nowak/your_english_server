import React from "react";
import styles from "./mainPage.module.scss";
import { useNavigate } from "react-router-dom";
export default function Logo({ phone = false }) {
  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate("/");
  };
  let path = phone ? "/phone_logo2.png" : "/logo2.png";
  return (
    <div className={styles.logoContainer}>
      <img
        onClick={navigateToHome}
        className={styles.logo}
        src={path}
        alt="Logo"
      />
    </div>
  );
}
