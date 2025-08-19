const url = "http://srv40.mikr.us:30172/api";
export async function getWordbases() {
  return await fetchDataWithToken(`${url}/wordbases`, "get");
}

export async function fetchDataWithToken(url, method, body) {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found in localStorage");
  }
  const response = await fetch(`${url}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",

      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
    credentials: "include",
  });
  if (response.ok) {
    const data = await response.json();
    console.log(data);
    return data;
  } else {
    if (response.status === 401 || response.status === 403) {
      localStorage.removeItem("token");
    }
    throw new Error("Failed to fetch data");
  }
}
export async function fetchData(endpoint, method, body) {
  const response = await fetch(`${url}${endpoint}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (response.ok) {
    const data = await response.json();
    console.log(data);
    return data;
  } else {
    throw new Error("Failed to fetch data");
  }
}

export async function getUserData() {
  return await fetchDataWithToken(`${url}/user`, "get");
}
export async function getWordbasesWithCount() {
  return await fetchDataWithToken(`${url}/wordbasesWithCount`, "get");
}
export async function createWordbase(name) {
  return await fetchDataWithToken(`${url}/wordbase`, "post", { name: name });
}
export async function deleteWordbase(name) {
  return await fetchDataWithToken(`${url}/wordbase/${name}`, "delete");
}
export async function getWordbase(name) {
  return await fetchDataWithToken(`${url}/wordbase/${name}`, "get");
}
export async function updateRelation(wordBaseName, number, word, meaning) {
  return await fetchDataWithToken(
    `${url}/wordbase/${wordBaseName}/relation/${number}`,
    "put",
    {
      word: word,
      meaning: meaning,
    }
  );
}
export async function addRelation(wordbaseName, word, meaning) {
  return await fetchDataWithToken(
    `${url}/wordbase/${wordbaseName}/relation`,
    "post",
    {
      word: word,
      meaning: meaning,
    }
  );
}
export async function deleteRelation(wordbaseName, number) {
  return await fetchDataWithToken(
    `${url}/wordbase/${wordbaseName}/relation/${number}`,
    "delete"
  );
}

export async function checkToken() {
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }
  try {
    await fetchDataWithToken(`${url}/user`, "get");
  } catch (error) {
    localStorage.removeItem("token");
    return false;
  }
  return true;
}

export async function getProfile() {
  const response = await fetchDataWithToken(`${url}/profile`, "get");
  return response.data;
}
