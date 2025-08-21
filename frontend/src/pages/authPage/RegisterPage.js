import React, { useContext, useRef, useState } from "react";
import styles from "./authPage.module.scss";
import { register } from "../../http/auth";
import Loading from "../../utils/loading/Loading";
import LoadingContext from "../../context/LoadingContext";
export default function RegisterPage() {
  const mailInput = useRef("");
  const passwordInput = useRef("");
  const nameInput = useRef("");
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const confirmPasswordInput = useRef("");
  const loadingContext = useContext(LoadingContext);
  const [errors, setErrors] = useState({});
  const [confirmError, setConfirmError] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    let tmp = document.createElement("input");
    document.body.appendChild(tmp);
    tmp.focus();
    document.body.removeChild(tmp);
    setErrors({});
    loadingContext.setLoading(true);
    register(
      {
        name: nameInput.current,
        email: mailInput.current,
        password: passwordInput.current,
      },
      onRegisterSuccess,
      onRegisterFail,
      onRequestFail
    );
  };
  const onEmailChange = (e) => {
    mailInput.current = e.target.value;
  };
  const onPasswordChange = (e) => {
    passwordInput.current = e.target.value;
    if (errors.password) {
      if (
        passwordInput.current.length >= 6 &&
        passwordInput.current.length <= 40
      )
        setErrors({ ...errors, password: "" });
    }
    checkPassword();
  };
  const onNameChange = (e) => {
    nameInput.current = e.target.value;
    if (errors.username) {
      if (nameInput.current.length >= 3 && nameInput.current.length <= 20) {
        setErrors({ ...errors, username: "" });
      }
    }
  };
  const onConfirmPasswordChange = (e) => {
    confirmPasswordInput.current = e.target.value;
    checkPassword();
  };

  const onRegisterFail = (errors) => {
    passwordInput.current = "";
    confirmPasswordInput.current = "";
    passwordRef.current.value = "";
    confirmPasswordRef.current.value = "";
    loadingContext.setLoading(false);
    setErrors(errors);
  };
  const onRequestFail = (response) => {};

  const onRegisterSuccess = (token) => {
    loadingContext.setLoading(false);
    localStorage.setItem("token", token);
    window.location.href = "/";
    // window.location.href = "/emailSent";
  };
  const checkPassword = () => {
    if (passwordInput.current !== confirmPasswordInput.current) {
      setConfirmError(true);
    } else {
      setConfirmError(false);
    }
  };
  return (
    <div>
      <div
        className={styles.absoluteLogo + " " + styles.logo1}
        onClick={() => (window.location.pathname = "/")}
      >
        <img src="logo1.png" />
      </div>
      <div
        className={styles.absoluteLogo + " " + styles.logo2}
        onClick={() => (window.location.pathname = "/")}
      >
        <img src="phone_logo.png" />
      </div>
      <div className={styles.container}>
        <div className={styles.title}>register</div>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputContainer}>
            <div className={styles.error}>{errors.username}</div>
            <label className={styles.label}>username</label>
            <input
              type="text"
              placeholder="Username"
              className={
                styles.input + " " + (errors.username ? styles.badInput : "")
              }
              onChange={onNameChange}
            />
            <div className={styles.error}>{errors.password}</div>
            <label className={styles.label}>password</label>
            <input
              ref={passwordRef}
              type="password"
              placeholder="Password"
              className={
                styles.input + " " + (errors.password ? styles.badInput : "")
              }
              onChange={onPasswordChange}
            />
            <div className={styles.error}>
              {confirmError ? "password doesn't match" : ""}
            </div>
            <label className={styles.label}>Confirm password</label>
            <input
              ref={confirmPasswordRef}
              type="password"
              placeholder="Confirm Password"
              className={
                styles.input + " " + (confirmError ? styles.badInput : "")
              }
              onChange={onConfirmPasswordChange}
            />
            <input
              type="submit"
              value="register"
              className={styles.btn}
              onClick={handleSubmit}
              disabled={confirmError}
              style={{ opacity: confirmError ? 0.5 : 1 }}
            />
          </div>
        </form>
        <div className={styles.newAccount}>
          Already have an account? <a href="/login">Log in</a>
        </div>
      </div>
    </div>
  );
}
