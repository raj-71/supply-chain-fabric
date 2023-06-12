import http from './httpService';
import jwtDecode from 'jwt-decode';
import httpService from './httpService';
const apiLogin = "/users/login";
const apiLogout = "/logout";
const tokenKey = "token";
const roleKey = "orgName";
const userid = "userid";

export async function login(username, password, org) {
    const {data : res} = await http.post(apiLogin, { username, password, orgName: org });

    localStorage.setItem(tokenKey, res.token);
    localStorage.setItem(roleKey, res.orgName);
    localStorage.setItem(userid, res.userId);
    
    return res;
}

export async function verifyUser() {
    const token = localStorage.getItem(tokenKey);
    localStorage.setItem(tokenKey, token);
}

export async function loginWithJwt(jwt) {
    localStorage.setItem(tokenKey, jwt);
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

export function getJwt() {
    return localStorage.getItem(tokenKey);
}

export function getRole() {
    return localStorage.getItem(roleKey);
}
export function getId() {
    return localStorage.getItem(userid);
}

const authService = { login, loginWithJwt, logout, getCurrentUser, getJwt, verifyUser, getRole, getId };

export default authService;