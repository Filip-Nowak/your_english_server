import styles from "./aboutUs.module.scss";
function Example({ text, img, index }) {
  return (
    <>
      <div className={styles.example}>
        <div className={styles.exampleIndex}>{index + 1}.</div>
        <div className={styles.exampleText}>{text}</div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
          className={styles.exampleImageContainer}
        >
          {img && <img src={img} alt={text} className={styles.exampleImage} />}
        </div>
      </div>
    </>
  );
}

export default Example;
