import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/list";

function listUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getLists() {
  return http.get(apiEndpoint);
}

export function getList(listId) {
  return http.get(listUrl(listId));
}

export function saveList(list) {
  if (list._id) {
    const body = { ...list };
    delete body._id;
    return http.put(listUrl(list._id), body);
  }

  return http.post(apiEndpoint, list);
}

export function deleteList(listId) {
  return http.delete(listUrl(listId));
}
