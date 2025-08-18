import {
  startChoice,
  startConnect,
  startFlashcards,
  startInsert,
  startRandom,
} from "../../http/practice";
import {
  checkToken,
  getUserData,
  getWordbase,
  getWordbases,
  getWordbasesWithCount,
} from "../../http/userData";
export async function homeLoader() {
  return null;
}
export async function sidebarLoader() {
  const t = await checkToken();
  console.log("token", t);
  if (!t) {
    return { wordbasesResponse: [], userResponse: null, token: false };
  }
  const wordbasesResponse = await getWordbases();
  const userResponse = await getUserData();
  return {
    wordbasesResponse: wordbasesResponse,
    userResponse: userResponse,
    token: true,
  };
}
export async function wordbasesLoader() {
  const wordbasesResponse = await getWordbasesWithCount();
  return { wordbasesResponse: wordbasesResponse };
}
export async function singleWordBaseLoader({ params }) {
  const name = params.name;
  const wordbaseResponse = await getWordbase(name);
  console.log(wordbaseResponse);
  return { wordbaseResponse: wordbaseResponse };
}
export async function practiceLoader() {
  const wordbasesResponse = await getWordbasesWithCount();
  return { wordbasesResponse: wordbasesResponse };
}
export async function flashcardsLoader() {
  const params = getParams();
  if (params === undefined) {
    return null;
  }
  const response = await startFlashcards(params.w);
  if (response.error) {
    console.log(response.message);
    // window.location.href = "/";
    return null;
  }
  response.data.wordbases = params.w;
  return { response: response };
}

export async function choiceLoader() {
  const params = getParams();
  if (params === undefined) {
    return null;
  }
  const response = await startChoice(params.w);
  return { response: response };
}

export async function insertLoader() {
  const params = getParams();
  if (params === undefined) {
    return null;
  }
  const response = await startInsert(params.w);
  return { response: response };
}

export async function connectLoader() {
  const params = getParams();
  if (params === undefined) {
    return null;
  }
  const response = await startConnect(params.w);
  return { response: response };
}

export async function randomLoader() {
  const params = getParams();
  if (params === undefined) {
    return null;
  }
  const response = await startRandom(params.w);
  return { response: response };
}
function getParams() {
  const query = window.location.search;
  const params = {};
  for (let param of query.substring(1).split("&")) {
    let [key, value] = param.split("=");
    value = decodeURIComponent(value);
    if (params[key] !== undefined) {
      if (!Array.isArray(params[key])) {
        params[key] = [params[key]];
      }
      params[key].push(value);
    } else {
      params[key] = value;
    }
  }
  if (params.w === undefined) {
    window.location.href = "/practice";
    return;
  }
  if (!Array.isArray(params.w)) {
    params.w = [params.w];
  }
  return params;
}

export async function confirmLoader({ params }) {
  const token = params.token;
  const response = await fetch(
    `http://192.168.1.26:8080/api/auth/confirm?token=${token}`,
    { headers: { "Content-Type": "application/json" } }
  );
  console.log(response);
  const data = await response.json();
  return { error: data.error, message: data.message };
}
export async function exampleFlashcardsLoader() {
  const response = await fetch(
    "http://192.168.1.26:8080/api/example-practice/flashcards",
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  const data = await response.json();
  console.log(data);
  return { response: data };
}

export async function exampleMultipleChoiceLoader() {
  const response = await fetch(
    "http://192.168.1.26:8080/api/example-practice/choice",
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  const data = await response.json();
  console.log(data);
  return { response: data };
}
export async function exampleInsertLoader() {
  const response = await fetch(
    "http://192.168.1.26:8080/api/example-practice/insert",
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  const data = await response.json();
  console.log(data);
  return { response: data };
}
export async function exampleConnectLoader() {
  const response = await fetch(
    "http://192.168.1.26:8080/api/example-practice/connect",
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  const data = await response.json();
  console.log(data);
  return { response: data };
}
