import { fetchDataWithToken } from "./userData";

const url = "http://192.168.1.26:8080/api";
export async function register(
  { name, password },
  onRegisterSuccess,
  onRegisterFail,
  onRequestFail
) {
  const body = JSON.stringify({ username: name, password: password });
  console.log(body);
  const response = await fetch(`${url}/auth/register`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: body,
  });
  if (response.ok) {
    const data = await response.json();
    console.log(data);
    if (data.errors === null) {
      onRegisterSuccess(data.token);
    } else {
      const errorsArr = data.errors.split(";");
      errorsArr.pop();
      const errors = {};
      for (let i = 0; i < errorsArr.length; i++) {
        const key = errorsArr[i].split(":")[0];
        const value = errorsArr[i].split(":")[1];
        errors[key] = value;
      }
      onRegisterFail(errors);
    }
  } else {
    onRequestFail(response);
  }
}
export async function login(
  { username, password },
  onLoginSuccess,
  onLoginFail,
  onRequestFail
) {
  const body = JSON.stringify({ username: username, password: password });
  const response = await fetch(`${url}/auth/authenticate`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: body,
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors === null) {
      onLoginSuccess(data.token);
    } else {
      console.log(data.errors);
      const errorsArr = data.errors.split(";");
      errorsArr.pop();
      const errors = {};
      for (let i = 0; i < errorsArr.length; i++) {
        const key = errorsArr[i].split(":")[0];
        const value = errorsArr[i].split(":")[1];
        errors[key] = value;
      }
      onLoginFail(errors);
    }
  } else {
    onRequestFail(response);
  }
}

export async function changeUsername(newUsername, currentPassword) {
  const body = {
    username: newUsername,
    password: currentPassword,
  };
  console.log(body);
  console.log("XD");
  const response = await fetchDataWithToken(
    `${url}/auth/change/username`,
    "post",
    body
  );
  console.log(response);
  if (!response.error) {
    const data = response;
    console.log(data);
    localStorage.removeItem("token");
    return true;
  } else {
    return response.message;
  }
}
export async function changePassword(username, currentPassword, newPassword) {
  const body = {
    username: username,
    password: currentPassword,
    newPassword: newPassword,
  };
  const response = await fetchDataWithToken(
    `${url}/auth/change/password`,
    "post",
    body
  );
  if (!response.error) {
    const data = response;
    console.log(data);
    localStorage.removeItem("token");
    return true;
  } else {
    return response.message;
  }
}
export async function deleteAccount(username, password) {
  const body = {
    username: username,
    password: password,
  };
  const response = await fetchDataWithToken(
    `${url}/auth/delete/account`,
    "post",
    body
  );
  if (!response.error) {
    localStorage.removeItem("token");
    return true;
  } else {
    return response.message;
  }
}
