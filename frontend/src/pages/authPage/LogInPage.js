import React, { useContext, useRef, useState } from "react";
import styles from "./authPage.module.scss";
import { login } from "../../http/auth";
import LoadingContext from "../../context/LoadingContext";
export default function LogInPage() {
  const usernameInput = useRef("");
  const passwordInput = useRef("");
  const passwordRef = useRef(null);
  const [error, setError] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const loadingContext = useContext(LoadingContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    let tmp = document.createElement("input");
    document.body.appendChild(tmp);
    tmp.focus();
    document.body.removeChild(tmp);
    setError(false);
    loadingContext.setLoading(true);
    login(
      { username: usernameInput.current, password: passwordInput.current },
      onLoginSuccess,
      onLoginFail,
      onRequestFail
    );
  };
  const onUsernameChange = (e) => {
    setError(false);
    usernameInput.current = e.target.value;
    if (
      usernameInput.current.length === 0 ||
      passwordInput.current.length === 0
    ) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  };
  const onPasswordChange = (e) => {
    setError(false);
    passwordInput.current = e.target.value;
    if (
      usernameInput.current.length === 0 ||
      passwordInput.current.length === 0
    ) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  };
  const onLoginFail = (errors) => {
    passwordInput.current = "";
    passwordRef.current.value = "";
    console.log("login fail");
    loadingContext.setLoading(false);
    setError(true);
    console.log(errors);
  };
  const onLoginSuccess = (token) => {
    loadingContext.setLoading(false);
    console.log("login success");
    console.log(token);
    localStorage.setItem("token", token);
    window.location.href = "/";
  };
  const onRequestFail = (response) => {
    loadingContext.setLoading(false);
    console.log("request fail");
    // setError(true);
    console.log(response);
  };
  console.log(usernameInput.current.length === 0);
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
        <div className={styles.title}>log in</div>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputContainer}>
            <div className={styles.error}>
              {error ? "username or password was incorrect" : ""}
            </div>
            <label className={styles.label}>username</label>
            <input
              type="text"
              placeholder="Username"
              className={styles.input}
              onChange={onUsernameChange}
            />
            <div className={styles.error}></div>
            <label className={styles.label}>password</label>
            <input
              ref={passwordRef}
              type="password"
              placeholder="Password"
              className={styles.input}
              onChange={onPasswordChange}
            />
            <input
              type="submit"
              className={styles.btn}
              onClick={handleSubmit}
              disabled={buttonDisabled}
              value={"log in"}
              style={{
                opacity: buttonDisabled ? 0.5 : 1,
              }}
            />
          </div>
        </form>
        <div className={styles.newAccount}>
          Don't have an account? <a href="/register">Register</a>
        </div>
      </div>
    </div>
  );
}
