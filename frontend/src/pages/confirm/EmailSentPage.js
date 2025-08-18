import React from "react";
import Title from "../../components/title/Title";
import Button from "./Button";

export default function EmailSentPage() {
  return (
    <div>
      <Title>Email sent</Title>
      <p>
        An email has been sent to your email address. Please check your inbox
        and click the link in the email to confirm your email address.
      </p>
      <Button
        message="login"
        handleClick={() => (window.location.href = "/login")}
      />
    </div>
  );
}
