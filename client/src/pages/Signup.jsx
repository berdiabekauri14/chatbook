export default function Signup() {

    const handleSubmit = e => {
        const fullname = e.target.fullname;
        const email = e.target.email;
        const password = e.target.password;

        const formObj = {
            fullname,
            email,
            password
        }

        console.log(formObj)
    }

    return (
        <form>
            <h1>Sign Up</h1>
            <input type="text" name="fullname" placeholder="Enter your fullname" required />
            <br />
            <input type="email" name="email" placeholder="Enter your email" required />
            <br />
            <input type="password" name="password" placeholder="Create a password" required />
            <br />
            <button onClick={handleSubmit}>Submit</button>
        </form>
    )
}