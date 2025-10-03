import { Link } from "react-router"

export default function Nav() {
    return (
        <nav>
            <Link to="/client/src/pages/Signup.jsx">Sign up</Link>
            <Link to="/client/src/pages/Login.jsx">Login</Link>
        </nav>
    )
}