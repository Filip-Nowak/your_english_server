import { useEffect, useRef, useState } from "react";
import Modal from "../../components/moadal/Modal";
import styles from "./profile.module.scss";
function ProfileModal({
  header,
  inputs,
  show,
  areYouSureText,
  confirmText,
  closeModal,
  onConfirm,
}) {
  const [formData, setFormData] = useState([
    {
      name: "",
      value: "",
    },
  ]);
  const [errors, setErrors] = useState({});
  useEffect(() => {
    if (show) {
      setFormData(inputs.map((input) => ({ name: input.name, value: "" })));
    }
  }, [show]);
  const changeFormData = (name, value) => {
    setFormData((prevData) =>
      prevData.map((item) => (item.name === name ? { ...item, value } : item))
    );
  };

  const checkboxRef = useRef(null);
  const handleCancel = () => {
    closeModal();
  };
  console.log(formData);
  const handleConfirm = (e) => {
    console.log("Confirm clicked");
    e.preventDefault();
    console.log(checkboxRef.current.checked);
    if (checkboxRef.current && !checkboxRef.current.checked) {
      alert("Please confirm the action by checking the box.");
      return;
    }
    const confirmObj = {};
    formData.forEach((item) => {
      confirmObj[item.name] = item.value;
    });
    const result = onConfirm(confirmObj);
    setErrors(result);
  };
  console.log(errors);
  return show ? (
    <Modal className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.header}>{header}</div>
        <div onSubmit={handleConfirm} className={styles.form}>
          {inputs.map((input, index) => (
            <div>
              <div className={styles.error}>
                {errors[input.name] && (
                  <span className={styles.errorText}>{errors[input.name]}</span>
                )}
              </div>
              <div key={index} className={styles.inputGroup}>
                <label>{input.label}</label>
                <form>
                  <input
                    value={
                      formData.find((item) => item.name === input.name)
                        ?.value || ""
                    }
                    onChange={(e) => changeFormData(input.name, e.target.value)}
                    type={input.type}
                    placeholder={input.placeholder}
                    name={input.name}
                  />
                </form>
              </div>
            </div>
          ))}
          <div className={styles.areYouSure}>
            <span>{areYouSureText}</span>

            <label>
              <input
                ref={checkboxRef}
                type="checkbox"
                id="confirmCheckbox"
                name="confirmCheckbox"
              />{" "}
              {confirmText}
            </label>
          </div>
          <form>
            <div className={styles.buttons}>
              <button onClick={handleCancel}>Anuluj</button>
              <button type="submit">Potwierdź</button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  ) : null;
}

export default ProfileModal;
