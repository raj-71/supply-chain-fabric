import httpService from "./httpService";

const apiEndpoint = "/register";

export async function register(user) {
  const res = await httpService.post(apiEndpoint, user);

  console.log(res.data);

  return res;

}

const registerService = { register };

export default registerService;
