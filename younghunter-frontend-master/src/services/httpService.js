import axios from "axios";
import Cookies from "js-cookie"

const BASE_URL = "https://young-hunter.liara.run/api/v1";

const app = axios.create({
  baseURL: BASE_URL,
  withCredentials: "include"
});


app.interceptors.request.use(
(config) => {
  const token = Cookies.get("token")
  if(token) {
    config.headers["Authorization"] = `Bearer ${token}`
  }
  return config
},
(error) => {
  return Promise.reject(error)
}
)

const http = {
  get: app.get,
  post: app.post,
  delete: app.delete,
  put: app.put,
  patch: app.patch,
};

export default http;
