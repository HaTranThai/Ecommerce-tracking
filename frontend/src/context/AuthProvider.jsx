// src/context/AuthProvider.js
import React, { createContext } from "react";

export const AuthToken = createContext();

const AuthProvider = ({ children }) => {
    const authData = {
        user: null,
        role: null,
        userInfo: null,
        login: () => {},
        logout: () => {},
    };

    return (
        <AuthToken.Provider value={authData}>
            {children}
        </AuthToken.Provider>
    );
};

export default AuthProvider;
