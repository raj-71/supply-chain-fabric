import axios from "axios";
import logService from "./logService";

const instance = axios.create({
  baseURL: "http://localhost:4000/",
  timeout: 30000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    'token': localStorage.getItem("token"),
  },
});

instance.interceptors.request.use((config) => { 
    const token = localStorage.getItem("token");
    if(token){
        config.headers.token = token;
    }

    return config;
 })

// instance.interceptors.response.use(null, (err) => {
//   if(err.response.status === 408){
//     localStorage.clear();
//     window.location.href = "/login";
//   }
//   else if (err.response.status === 401) {
//     localStorage.clear();
//     window.location.href = "/login";
//   }
//   if (!err.response.data.isverified || !err.response.data.isprofileupdated) {
//     logService.log(err.response.data);
//     if (err.response.status === 400) {
//       if (err.response.data.isverified === false) {
//         window.location.href = "/verify-account";
//       } else if (err.response.data.isprofileupdated === false) {
//         window.location.href = "/update-profile";
//       }
//     }
//   } else {
//     logService.log(err.message);
//   }
//   return Promise.reject(err);
// });

function setJWT(jwt) {}

const httpService = {
  setJWT,
  get: instance.get,
  post: instance.post,
  put: instance.put,
  delete: instance.delete,
};

export default httpService;