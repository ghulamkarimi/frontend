
import { configureStore } from "@reduxjs/toolkit";
import userReducer, { fetchUsers, setToken } from "../reducers/userSlice"; 
import appReducer from "../reducers/appSlice"; 
import { getCarRent, refreshToken} from "../../service";
import { axiosJWT } from "../../service/axiosJwt";
import carRentReducer, { getRentCarApi } from "../reducers/carRentSlice"



export const store = configureStore({
    reducer :{
        users: userReducer,
        app: appReducer,
        carRent:carRentReducer
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
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  store.dispatch(fetchUsers());
  store.dispatch(getRentCarApi())
  
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
