import http from "./httpService";

export default function getUsers() {
  return http.get("/users").then(({ data }) => data.data);
}

export function loginApi(data) {
  return http.post("/users/login", data).then(({ data }) => data);
}
