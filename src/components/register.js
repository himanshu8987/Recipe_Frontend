import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function Register() {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("https://mern-recipe-backend-six.vercel.app/auth/register", { username, password, email });
            alert("Registration completed! Please Login");

            navigate("/login")
        }
        catch (error) {
            console.log(error);
        }
    };
    return (
        <div className='auth-container'>
            <form onSubmit={onSubmit}>
                <h2> Register</h2>
                <div className='form-group'>
                    <label for="username"> Username: </label>
                    <input type='text' id="username" placeholder='username' value={username} onChange={(event) => setUsername(event.target.value)} />
                </div>

                <div className='form-group'>
                    <label for="password"> Password: </label>
                    <input type='password' placeholder='password' id="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                </div>

                <div className='form-group'>
                    <label for="email"> Email: </label>
                    <input type='email' placeholder='email' id="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                </div>
                <button type='submit'>Register</button>
                <p>Already have an account ?<a href='/login' className=''>Signin</a></p>
            </form>
        </div>
    )
}

export default Register