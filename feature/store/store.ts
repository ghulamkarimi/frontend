
import { configureStore } from "@reduxjs/toolkit";
import userReducer, { fetchUsers, setToken } from "../reducers/userSlice"; 
import appReducer from "../reducers/appSlice"; 
import carBuyReducer, { fetchCarBuys } from "../reducers/carBuySlice";
import { refreshToken} from "../../service";
import { axiosJWT } from "../../service/axiosJwt";



export const store = configureStore({
    reducer :{
        users: userReducer,
        app: appReducer,
        carBuys: carBuyReducer,
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
  store.dispatch(fetchCarBuys());
  
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
