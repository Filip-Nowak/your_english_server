import { fetchDataWithToken } from "./userData";

const url = "http://192.168.1.26:8080/api/practice";
export async function startFlashcards(wordbases) {
  const link = getLink("flashcards", wordbases, 0, true);
  return await fetchDataWithToken(link, "get");
}
export async function loadFlashCards(wordbases, page) {
  const link = getLink("flashcards", wordbases, page);
  return await fetchDataWithToken(link, "get");
}

export async function startChoice(wordbases) {
  const link = getLink("choice", wordbases);
  return await fetchDataWithToken(link, "get");
}

export async function startInsert(wordbases) {
  const link = getLink("insert", wordbases);
  return await fetchDataWithToken(link, "get");
}

export async function startConnect(wordbases) {
  const link = getLink("connect", wordbases);
  return await fetchDataWithToken(link, "get");
}

export async function startRandom(wordbases, page) {
  const link = getLink("random", wordbases, page);
  return await fetchDataWithToken(link, "get");
}
function getLink(name, wordbases, page, newSet) {
  let link = `${url}/${name}?`;
  for (let wordbase of wordbases) {
    link += `w=${wordbase}&`;
  }
  link = link.slice(0, -1);
  if (page || page === 0) link += `&page=${page}`;
  if (newSet) link += `&newSet=${newSet}`;
  return link;
}
