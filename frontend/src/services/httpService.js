import axios from "axios";
import authService from "./authService";
// import logService from "./logService";

const instance = axios.create({
  baseURL: "http://localhost:4000/",
  timeout: 30000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    // 'token': localStorage.getItem("token"),
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
});

function setJWT(jwt) {}

const httpService = {
  setJWT,
  get: instance.get,
  post: instance.post,
  put: instance.put,
  delete: instance.delete,
};

export default httpService;