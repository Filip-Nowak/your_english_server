import { useContext, useEffect, useState } from "react";
import styles from "./profile.module.scss";
import { getProfile } from "../../http/userData";
import ProfileModal from "./ProfileModal";
import LoadingContext from "../../context/LoadingContext";
import { changePassword, changeUsername, deleteAccount } from "../../http/auth";
function ProfileLayout() {
  const [profile, setProfile] = useState({ username: "", wordbases: [] });
  const [changeUsernameModal, setChangeUsernameModal] = useState(false);
  const [changePasswordModal, setChangePasswordModal] = useState(false);
  const [deleteAccountModal, setDeleteAccountModal] = useState(false);
  const loadingContext = useContext(LoadingContext);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const response = await getProfile();
    setProfile({
      username: response.username,
      wordbases: response.wordBases || [],
    });
  };
  const openChangePasswordModal = () => {
    setChangeUsernameModal(true);
    console.log("Change password modal opened");
  };
  const confirmChangeUsername = (formData) => {
    const newUsername = formData.newUsername;
    const currentPassword = formData.currentPassword;
    const errors = {
      newUsername: "",
      currentPassword: "",
    };
    if (!newUsername || newUsername.trim().length < 3) {
      errors.newUsername = "Nazwa użytkownika musi mieć co najmniej 3 znaki.";
    }
    if (!currentPassword || currentPassword.trim().length === 0) {
      errors.currentPassword = "Hasło jest wymagane.";
    }
    if (errors.username || errors.currentPassword) {
      return errors;
    }
    loadingContext.setLoading(true);
    changeUsername(newUsername, currentPassword).then((success) => {
      console.log(success);
      loadingContext.setLoading(false);
      if (success === true) {
        alert(
          "Nazwa użytkownika została zmieniona pomyślnie. Będziesz musiał się ponownie zalogować."
        );
        window.location.reload();
      } else {
        alert(success);
      }
    });

    return errors;
  };

  const confirmChangePassword = (formData) => {
    const username = formData.username;
    const currentPassword = formData.currentPassword;
    const newPassword = formData.newPassword;
    const confirmNewPassword = formData.confirmNewPassword;
    const errors = {
      username: "",
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    };
    if (!username) {
      errors.username = "Nazwa użytkownika jest wymagana.";
    }
    if (!currentPassword || currentPassword.trim().length === 0) {
      errors.currentPassword = "Hasło jest wymagane.";
    }
    if (!newPassword || newPassword.trim().length < 6) {
      errors.newPassword = "Nowe hasło musi mieć co najmniej 6 znaków.";
    }
    if (newPassword !== confirmNewPassword) {
      errors.confirmNewPassword = "Nowe hasło i potwierdzenie nie pasują.";
    }
    if (Object.values(errors).some((error) => error)) {
      return errors;
    }
    loadingContext.setLoading(true);
    changePassword(username, currentPassword, newPassword).then((success) => {
      loadingContext.setLoading(false);
      if (success === true) {
        alert(
          "Hasło zostało zmienione pomyślnie. Będziesz musiał się ponownie zalogować."
        );
        window.location.reload();
      } else {
        alert(success);
      }
    });
    return errors;
  };
  const confirmDeleteAccount = (formData) => {
    const username = formData.username;
    const password = formData.password;
    const errors = {
      username: "",
      password: "",
    };
    if (!username || username.trim().length === 0) {
      errors.username = "Nazwa użytkownika jest wymagana.";
    }
    if (!password || password.trim().length === 0) {
      errors.password = "Hasło jest wymagane.";
    }
    if (Object.values(errors).some((error) => error)) {
      return errors;
    }
    loadingContext.setLoading(true);
    deleteAccount(username, password).then((success) => {
      loadingContext.setLoading(false);
      if (success === true) {
        alert("Konto zostało usunięte pomyślnie.");
        window.location.reload();
      } else {
        alert(success);
      }
    });
    return errors;
  };

  return (
    <div className={styles.profile}>
      <div className={styles.profileHeader}>
        <h1>Profil</h1>
      </div>
      <div className={styles.profileContent}>
        <div className={styles.editPanel}>
          <div className={styles.usernameContainer}>
            <div>
              <span>Nazwa użytkownika:</span> {profile.username}
            </div>
            <div
              className={styles.editButton}
              onClick={() => openChangePasswordModal()}
            >
              <i className="fa-solid fa-pen-to-square"></i>
            </div>
          </div>
          <div className={styles.changePasswordContainer}>
            <div
              className={styles.changePasswordButton}
              onClick={() => setChangePasswordModal(true)}
            >
              Zmień&nbsp;Hasło
            </div>
          </div>
          <div className={styles.deleteAccountContainer}>
            <div
              className={styles.deleteAccountButton}
              onClick={() => setDeleteAccountModal(true)}
            >
              Usuń Konto
            </div>
          </div>
          <div className={styles.logoutContainer}>
            <div
              className={styles.logoutButton}
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/";
              }}
            >
              Wyloguj
            </div>
          </div>
        </div>
        <div className={styles.wordbasesPanel}>
          <div className={styles.wordbasesFrame}>
            <h2>Twoje Słowniki</h2>
            <div className={styles.listStart}></div>
            <div className={styles.wordbasesList}>
              {profile.wordbases.length > 0 ? (
                profile.wordbases.map((wordbase, index) => (
                  <div
                    key={index}
                    className={styles.wordbaseItem}
                    onClick={() => {
                      window.location.href = `/wordbase/${wordbase.name}`;
                    }}
                  >
                    <span>{wordbase.name}</span>
                    <span>
                      <span style={{ color: "#737373", fontSize: "1.2rem" }}>
                        słowa:
                      </span>{" "}
                      {wordbase.wordCount}
                    </span>
                  </div>
                ))
              ) : (
                <div className={styles.noWordbases}>
                  Nie znaleziono słowników.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ProfileModal
        onConfirm={confirmChangeUsername}
        show={changeUsernameModal}
        header={"Zmień Username"}
        inputs={[
          {
            name: "newUsername",
            label: "Nowy username",
            type: "text",
            placeholder: "Wprowadź nowy username",
          },
          {
            label: "Aktualne hasło",
            type: "password",
            placeholder: "Wprowadź swoje aktualne hasło",
            name: "currentPassword",
          },
        ]}
        areYouSureText={
          "Czy na pewno chcesz zmienić swój username? Będziesz musiał zalogować się ponownie."
        }
        confirmText={"Chcę zmienić swój username."}
        closeModal={() => setChangeUsernameModal(false)}
      />
      <ProfileModal
        onConfirm={confirmChangePassword}
        show={changePasswordModal}
        header={"Zmień Hasło"}
        inputs={[
          {
            name: "username",
            label: "Username",
            type: "text",
            placeholder: "Wprowadź swój username",
          },
          {
            name: "currentPassword",
            label: "Aktualne hasło",
            type: "password",
            placeholder: "Wprowadź swoje aktualne hasło",
          },
          {
            name: "newPassword",
            label: "Nowe Hasło",
            type: "password",
            placeholder: "Wprowadź nowe hasło",
          },
          {
            name: "confirmNewPassword",
            label: "Potwierdź Nowe Hasło",
            type: "password",
            placeholder: "Potwierdź nowe hasło",
          },
        ]}
        areYouSureText={
          "Czy na pewno chcesz zmienić swoje hasło? Będziesz musiał się ponownie zalogować."
        }
        confirmText={"Chcę zmienić swoje hasło."}
        closeModal={() => setChangePasswordModal(false)}
      />
      <ProfileModal
        onConfirm={confirmDeleteAccount}
        show={deleteAccountModal}
        header={"Usuń Konto"}
        areYouSureText={
          "Czy na pewno chcesz usunąć swoje konto? Ta akcja jest nieodwracalna."
        }
        confirmText={"Chcę usunąć swoje konto."}
        closeModal={() => setDeleteAccountModal(false)}
        inputs={[
          {
            name: "username",
            label: "Username",
            type: "text",
            placeholder: "Wprowadź swój username",
          },
          {
            name: "password",
            label: "Hasło",
            type: "password",
            placeholder: "Wprowadź swoje hasło",
          },
        ]}
      />
    </div>
  );
}

export default ProfileLayout;
