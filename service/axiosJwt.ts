import axios from "axios";





const axiosJWT = axios.create({
  baseURL: "http://localhost:7001",
  withCredentials: true,
});


export default axiosJWT;
