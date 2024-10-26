import axios from 'axios';
import { TUser } from '../interface';



const SERVER_URL = "http://localhost:5000";

export const axiosJwt = axios.create();
axiosJwt.interceptors.request.use;

export const userRegister = (user:TUser) => {
    const url = `${SERVER_URL}/user/register`;
    return axios.post(url, user);
}

export const userLogin = (user:TUser) => {
    const url = `${SERVER_URL}/user/login`;
    return axios.post(url, user);
}

export const refreshToken = () => {
    const url = `${SERVER_URL}/user/refreshToken`;
    return axios.post(url);
}