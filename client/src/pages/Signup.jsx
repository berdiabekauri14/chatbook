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
            <input type="text" name="fullname" className=" border-2 rounded outline-0 p-3 m-3" placeholder="Enter your fullname" required />
            <br />
            <input type="email" name="email" className=" border-2 rounded outline-0 p-3 m-3" placeholder="Enter your email" required />
            <br />
            <input type="password" name="password" className=" border-2 rounded outline-0 p-3 m-3" placeholder="Create a password" required />
            <br />
            <button onClick={handleSubmit} className=" border-2 p-3 rounded cursor-pointer">Submit</button>
        </form>
    )
}