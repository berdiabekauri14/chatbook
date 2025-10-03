import Login from "./pages/login";
import Signup from "./pages/signup";
import { Routes, Route } from "react-router"

export default function Home() {
    return (
        <>
            <Routes>
                <Route path="/client/src/pages/Signup.jsx" element={Signup} />
                <Route path="/client/src/pages/Login.jsx" element={Login} />
            </Routes>
        </>
    )
}