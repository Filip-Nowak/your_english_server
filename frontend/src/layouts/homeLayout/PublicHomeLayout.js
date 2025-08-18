import { useNavigate } from "react-router-dom";
import styles from "./publicHomeLayout.module.scss";
function PublicHomeLayout() {
  const navigate = useNavigate();
  const handleLogIn = () => {
    navigate("/login");
  };
  const handleRegister = () => {
    navigate("/register");
  };
  const handleAboutUs = () => {
    navigate("/about");
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}>Witamy w</div>
      <img src="/logo1b.png" alt="Logo" className={styles.logo} />
      <div className={styles.descriptionA}>
        Your English to platforma zaprojektowana, aby pomóc Ci w nauce i
        ćwiczeniu języka angielskiego poprzez interaktywne bazy słów i
        ćwiczenia.
      </div>
      <div className={styles.accountDescription}>
        Konto jest wymagane do korzystania z funkcji platformy.
      </div>
      <div className={styles.authBox}>
        <button className={styles.authButton} onClick={handleLogIn}>
          Zaloguj się
        </button>
        <button className={styles.authButton} onClick={handleRegister}>
          Zarejestruj się
        </button>
      </div>
      <div className={styles.aboutUsBox}>
        <div className={styles.aboutUsText}>
          Chcesz dowiedzieć się więcej o nas?
        </div>
        <button className={styles.aboutUsButton} onClick={handleAboutUs}>
          O nas
        </button>
      </div>
    </div>
  );
}

export default PublicHomeLayout;
