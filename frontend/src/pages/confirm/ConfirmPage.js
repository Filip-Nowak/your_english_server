import React from "react";
import { useLoaderData } from "react-router-dom";
import Title from "../../components/title/Title";
import Button from "./Button";

export default function ConfirmPage() {
  const { error, message } = useLoaderData();
  return (
    <div>
      {error ? <Title>{message}</Title> : <Title>Success</Title>}
      {error ? (
        <div>
          <p>
            {message === "token not found"
              ? "The token you provided is invalid."
              : message === "token expired"
              ? "The token you provided has expired."
              : message === "email already confirmed"
              ? "email already confirmed"
              : "An error occurred. Please try again."}
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              message="regiser"
              handleClick={() => (window.location.href = "/register")}
            />
            <Button
              message="login"
              handleClick={() => (window.location.href = "/login")}
            />
          </div>
        </div>
      ) : (
        <div>
          <p>Your account has been successfully created. Now you can log in.</p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              message="login"
              handleClick={() => (window.location.href = "/login")}
            />
          </div>
        </div>
      )}
    </div>
  );
}
