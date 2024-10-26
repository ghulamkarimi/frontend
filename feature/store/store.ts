// src/feature/store/store.ts
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer, { setToken } from "../reducers/userSlice"; // Überprüfe den Pfad
import appReducer from "../reducers/appSlice"; // Überprüfe den Pfad
import { axiosJwt , refreshToken} from "../../service";
import { axiosJWT } from "../../service/axiosJwt";



export const store = configureStore({
    reducer :{
        users: userReducer,
        app: appReducer,
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
      if (Number(exp) * 1000 > currentDate.getDate()) {
        const response = await refreshToken();
        config.headers.Authorization = `Bearer ${response.data.refreshToken}`;
        store.dispatch(setToken(response.data.refreshToken));
        // store.dispatch(setUserInfoRefresh(response.data.userInfo_refresh));
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
