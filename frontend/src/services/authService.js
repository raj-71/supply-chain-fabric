import http from './httpService';
import jwtDecode from 'jwt-decode';
import httpService from './httpService';
const apiLogin = "/users/login";
const apiLogout = "/logout";
const tokenKey = "token";
const roleKey = "orgName";
const userid = "userid";

export async function login(data) {
    const res = await http.post(apiLogin, data);

    console.log(res);

    if (res.data.success) {
        localStorage.setItem(tokenKey, res.data.message.token);
        localStorage.setItem(roleKey, data.orgName);
        return true;
    }

    return res;
}

export async function logout() {
    // await httpService.get(apiLogout);
    console.log("logout called");
    localStorage.clear();
    return true;
}

export function getCurrentUser() {
    try {
        const jwt = localStorage.getItem(tokenKey);

        return jwtDecode(jwt).id;
    } catch (ex) {
        return null;
    }
}

// export function getJwt() {
//     return localStorage.getItem(tokenKey);
// }

export function getRole() {
    return localStorage.getItem(roleKey);
}

const authService = { login, logout, getCurrentUser,getRole };

export default authService;