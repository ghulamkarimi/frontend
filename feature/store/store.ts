// src/feature/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/userSlice"; // Überprüfe den Pfad
import appReducer from "../reducers/appSlice"; // Überprüfe den Pfad

export const store = configureStore({
    reducer: {
        users: userReducer,
        app: appReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
