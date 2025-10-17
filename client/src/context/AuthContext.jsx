/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { Form, useNavigate } from "react-router";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const API_URL = "http://localhost:3000/api";

export function AuthProvider({ children }){
    const [user, setUser] = useState(null);

    const navigate = useNavigate();

    const autoLogin = async () => {
        try {
            const res = await fetch(`${API_URL}/auth/auto-login`, {
                method: "POST",
                credentials: "include"
            });

            const result = await res.json();

            if(!res.ok) {
                throw new Error(result.message);
            }

            setUser(result);

            navigate("/profile");
        } catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        autoLogin();
    }, []);

    const login = async (formObj) => {
        try {
            const res = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formObj),
                credentials: "include"
            });

            const result = await res.json();

            if(!res.ok) {
                throw new Error(result.message);
            };

            setUser(result.data.user);

            navigate("/profile");
        } catch(err) {
            alert(err.message)
        }
    }

    const signup = async (formObj) => {
        try {
            const res = await fetch(`${API_URL}/auth/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formObj)
            });

            console.log(res)

            const data = await res.json();

            alert(data.message);
        } catch(err) {
            console.log(err);
        }
    }

    const logout = async () => {
        try {
            const res = await fetch(`${API_URL}/auth/log-out`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(Form)
            })

            console.log(res)

            const data = await res.json()

            alert(data.message)
        } catch(err) {
            console.log(`Error: ${err}`)
        }
    }

    return (
        <AuthContext.Provider value={{signup, login, logout, user}}>
            {children}
        </AuthContext.Provider>
    )
};