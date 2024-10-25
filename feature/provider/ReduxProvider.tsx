// src/feature/provider/ReduxProvider.tsx
"use client";

import { Provider } from "react-redux";
import { store } from "../store/store"; // Überprüfe den Pfad

interface IReduxProvider {
    children: React.ReactNode;
}

const ReduxProvider = ({ children }: IReduxProvider) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
}

export default ReduxProvider;
