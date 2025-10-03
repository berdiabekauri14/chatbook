export default function Login() {

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
            <input type="email" name="email" placeholder="Enter your email" required />
            <br />
            <input type="password" name="password" placeholder="Create a password" required />
            <br />
            <button onClick={handleSubmit}>Submit</button>
        </form>
    )
}