import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [_, setCookies] = useCookies(['access_token']);

    const toastVariables = {
        position: 'top-right',
        autoClose: 10000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
    };

    const navigate = useNavigate();

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('https://mern-recipe-backend-six.vercel.app/auth/login', { username, password });

            if (response.data.message === "User doesn't exists") {
                toast.error("User doesn't exist", toastVariables);
            } else if (response.data.message === 'User or password is incorrect') {
                toast.error('User or password is incorrect', toastVariables);
            } else {
                setCookies('access_token', response.data.token);
                window.localStorage.setItem('userID', response.data.userID);
                // alert("User login successfully");
                toast.success('User login successfully', { duration: 1000 }, toastVariables);
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={onSubmit}>
                <h2> Login</h2>
                <div className="form-group">
                    <label htmlFor="username"> Username: </label>
                    <input type="text" placeholder='username' id="username" value={username} onChange={(event) => setUsername(event.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="password"> Password: </label>
                    <input type="password" placeholder='password' id="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                </div>
                <button type="submit">Login</button>
                <p>Create new account<a href='/register'>Register</a></p>
                
            </form>
            <ToastContainer />
        </div>
    );
}

export default Login;
