import Nav from "../components/Nav";
import Posts from "../components/Posts";
import Login from "./Login"
import Profile from "./Profile";
import Signup from "./signup";
import { Routes, Route } from "react-router"
import img from "../assets/IMG_0613.PNG"

export default function Home() {
    return (
        <div className=" text-center">
            <header className=" flex justify-center items-center text-4xl bg-blue-700 text-white">
                <img src={img} className=" m-3" alt="img" width="99" />
                <br />
                <h1 className=" m-3"><b><u>Chatbook</u></b></h1>
                <br />
                <Nav />
            </header>
            <br />
            <Posts />
            <br />
            <Routes>
                <Route path="/client/src/pages/Signup.jsx" element={<Signup />} />
                <Route path="/client/src/pages/Login.jsx" element={<Login />} />
                <Route path="/client/src/pages/Profile.jsx" element={<Profile />} />
            </Routes>
            <br />
            <footer>
                <p className=" bg-blue-700 text-white text-6xl p-10">©2025 <u>Berdia Bekauri</u></p>
            </footer>
        </div>
    )
}