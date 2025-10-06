/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import { autoLogin } from "../../../server/controllers/auth.controller";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext)

const API_URL = "http://localhost:3000/api"

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)

    const login = async () => {
        try {
            const res = await fetch(`${API_URL}/auth/verify/login`)

            console.log(res)
            setUser(user)
        } catch(err) {
            console.log(err)
        }
    }

    const signup = async () => {
        try {
            const res = await fetch(`${API_URL}/auth/verify/signup`)

            console.log(res)
            setUser(user)
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <AuthContext.Provider value={{login, signup, autoLogin, user}}>
            {children}
        </AuthContext.Provider>
    )
}