import axios from 'axios';
import { TUser } from '../interface';


const SERVER_URL = "http://localhost:5000";

export const axiosJwt = axios.create();
axiosJwt.interceptors.request.use;

export const userRegister = (user:TUser) => {
    const url = `${SERVER_URL}/users/register`;
    return axios.post(url, user);
}