import useAuth from "../hooks/useAuth";

export default function Login() {
    const { login } = useAuth()

    login()

    const handleSubmit = e => {
        const email = e.target.email;
        const password = e.target.password;

        const formObj = {
            email,
            password
        }

        console.log(formObj)
    }

    return (
        <form>
            <h1>Login</h1>
            <input type="email" name="email" className=" border-2 rounded outline-0 p-3 m-3" placeholder="Enter your email" required />
            <br />
            <input type="password" name="password" className=" border-2 rounded outline-0 p-3 m-3" placeholder="Create a password" required />
            <br />
            <button onClick={handleSubmit} className=" border-2 p-3 rounded cursor-pointer">Submit</button>
        </form>
    )
}