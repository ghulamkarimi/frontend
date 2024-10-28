import axios from 'axios';
import { TUser } from '../interface';



const SERVER_URL = "http://localhost:5000";

axios.defaults.withCredentials = true;

export const axiosJwt = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
});
axiosJwt.interceptors.request.use;

export const userRegister = (user: TUser) => {
    const url = `${SERVER_URL}/user/register`;
    return axios.post(url, user);
}

export const userLogin = (user: TUser) => {
    const url = `${SERVER_URL}/user/login`;
    return axiosJwt.post(url, user);
}

export const getAllUsers = () => {
    const url = `${SERVER_URL}/user/allUsers`;
    return axios.get(url);
}

export const refreshToken = () => {
    const url = `${SERVER_URL}/user/refreshToken`;
    return axios.post(url);
}