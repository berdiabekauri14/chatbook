import { Link } from "react-router"

export default function Nav() {
    return (
        <nav className=" m-4">
            <Link to="/client/src/pages/Home.jsx" className=" m-3">Home</Link>
            <Link to="/client/src/pages/Signup.jsx" className=" m-3">Sign up</Link>
            <Link to="/client/src/pages/Login.jsx" className=" m-3">Login</Link>
            <Link to="/client/src/pages/Profile.jsx" className=" m-3">Profile</Link>
            <br />
            <li><button>Log out</button></li>
        </nav>
    )
}