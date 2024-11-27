import axios from 'axios';
import { TAppointment, TCarRent, TUser } from '../interface';
import axiosJWT from './axiosJwt';

const SERVER_URL = 'http://localhost:7001';


export const userRegister = (user: TUser) => {
    const url = `${SERVER_URL}/user/register`;
    return axios.post(url, user);
}

export const userLogin = (user: TUser) => {
    const url = `${SERVER_URL}/user/login`;
    return axiosJWT.post(url, user);
}

export const getAllUsers = () => {
    const url = `${SERVER_URL}/user/allUsers`;
    return axios.get(url);
}

export const userLogout = () => {
    const url = `${SERVER_URL}/user/logout`;
    return axiosJWT.delete(url);
}

export const refreshToken = () => {
    const url = `${SERVER_URL}/user/refreshToken`;
    return axios.get(url, { withCredentials: true }); // Mit Credentials senden
  };
  
  

export const profilePhotoUpload = (data: File) => {
    const url = `${SERVER_URL}/user/profile/photo`;
    const formData = new FormData();
    formData.append("image", data);
    return axiosJWT.put(url, formData,{
        headers: {
            "Content-Type": "multipart/form-data",
          },
    });
  };
  
// CarRent

export const getCarRent = () => {
    const url = `${SERVER_URL}/rent/getRents`;
    return axios.get(url);
}

// CarBuy

export const getOneCarById = (id: string) => {
    const url = `${SERVER_URL}/rent/getRent/${id}`;
    return axios.get(url);
}

export const getCarBuys = () => {
    const url = `${SERVER_URL}/buy/allBuys`;
    return axios.get(url);
}

// offers

export const getOffers = () => {
    const url = `${SERVER_URL}/offer/getOffers`;
    return axios.get(url);
}

// Appointment

export const createAppointment = (appointment: TAppointment) => {
    const url = `${SERVER_URL}/appointment`;
    return axios.post(url, appointment);
}

// SchutzPacket

export const allSchutzPacket = () => {
    const url = `${SERVER_URL}/schutzPacket/getAllSchutzPacket`;
    return axios.get(url);
}