import axios from 'axios';
import { TCarRent, TUser } from '../interface';
import { TBuy } from '../interface/index';
import { axiosJWT } from './axiosJwt';




const SERVER_URL = "http://localhost:7001";

axios.defaults.withCredentials = true;

export const axiosJwt = axios.create({
    baseURL: "http://localhost:7001",
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


// CarRent



export const getCarRent = ()=>{
    const url = `${SERVER_URL}/rent/getRents`
    return axios.get(url)
}
 

export const getCarBuys = ()=> {
    const url = `${SERVER_URL}/buy/allBuys`;
    return axios.get(url)
}

export const getCarBuysById = (buyCar:TBuy) => {
    const url = `${SERVER_URL}/buy/carBuy`;
    return axios.get(url, { params: buyCar });

}