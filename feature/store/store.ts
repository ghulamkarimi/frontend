
import { configureStore } from "@reduxjs/toolkit";
import userReducer, { fetchUsers, setToken } from "../reducers/userSlice"; 
import appReducer from "../reducers/appSlice"; 
import offerReducer, { fetchOffers } from "../reducers/offerSlice";
import { getCarRent, refreshToken} from "../../service";

import carBuyReducer, { fetchCarBuys } from "../reducers/carBuySlice";


import { axiosJWT } from "../../service/axiosJwt";
import carRentReducer, { getRentCarApi } from "../reducers/carRentSlice"



export const store = configureStore({
    reducer :{
        users: userReducer,
        app: appReducer,
        carRent:carRentReducer,
        carBuys: carBuyReducer,
        offer: offerReducer,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
})



axiosJWT.interceptors.request.use(
  async (config) => {
    const currentDate = new Date();
    const exp = localStorage.getItem("exp");

    if (exp && Number(exp) * 1000 < currentDate.getTime()) {
      const response = await refreshToken();
      
      const newAccessToken = response.data.accessToken;
      localStorage.setItem("exp", response.data.exp);
      config.headers.Authorization = `Bearer ${newAccessToken}`;
      
      store.dispatch(setToken(newAccessToken));
    } else {
      
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

  store.dispatch(fetchUsers());
  store.dispatch(getRentCarApi())
  store.dispatch(fetchCarBuys());
  store.dispatch(fetchOffers());

  
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
