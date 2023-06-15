import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4000/",
  timeout: 30000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// interceptor
instance.interceptors.request.use(
  (config) => {
    const token = getJWT();
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

function setJWT(jwt) {}

function getJWT() {
  return localStorage.getItem("token");
}

const httpService = {
  setJWT,
  get: instance.get,
  post: instance.post,
  put: instance.put,
  delete: instance.delete,
};

export default httpService;