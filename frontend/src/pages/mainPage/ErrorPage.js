export default function ErrorPage({ error }) {
  return (
    <div style={{ textAlign: "center", marginTop: "10vh" }}>
      <h1>Coś poszło nie tak!</h1>
      <p>{error?.message || "Wystąpił nieoczekiwany błąd."}</p>
      <a href="/">Powrót do strony głównej</a>
    </div>
  );
}
