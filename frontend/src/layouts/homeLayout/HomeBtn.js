import styles from "./homeLayout.module.scss";
function HomeBtn({ onClick, text, icon = null }) {
  return (
    <div className={styles.btnContainer} onClick={onClick}>
      {icon === null ? "" : <div>{icon}</div>}

      <div className={styles.text}>{text}</div>
    </div>
  );
}

export default HomeBtn;
