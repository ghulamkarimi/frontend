import axios from 'axios';
import { IAppointment, TAppointment, TCarRent, TUser } from '../interface';
import { TBuy } from '../interface/index';
import { axiosJWT } from './axiosJwt';




const SERVER_URL = "http://localhost:7001";

axios.defaults.withCredentials = true;

export const axiosJwt = axios.create({
    baseURL: "http://localhost:7001",
    withCredentials: true,
});
axiosJwt.interceptors.request.use;

// user

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
export const userLogout = () => {
    const url = `${SERVER_URL}/user/logout`;
    return axios.delete(url);
}

// CarRent

export const getCarRent = ()=>{
    const url = `${SERVER_URL}/rent/getRents`
    return axios.get(url)
}
 
// CarBuy

export const getOneCarById = (id:string)=>{
    const url = `${SERVER_URL}/rent/getRent/${id}`
    return axios.get(url)
}

export const getCarBuys = ()=> {
    const url = `${SERVER_URL}/buy/allBuys`;
    return axios.get(url)
}

// offers

export const getOffers = ()=> {
    const url = `${SERVER_URL}/offer/getOffers`;
    return axios.get(url)
}

// Appointment
export const createAppointment = (appointment : TAppointment)=> {
    const url = `${SERVER_URL}/appointment`;
    return axios.post(url, appointment)
}



// SchutzPacket


export const allSchutzPacket = ()=>{
    const url = `${SERVER_URL}/schutzPacket/getAllSchutzPacket`
    return axios.get(url)
}