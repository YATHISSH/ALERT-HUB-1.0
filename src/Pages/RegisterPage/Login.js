import React, { useState } from 'react';
import { FiMail } from 'react-icons/fi';
import { RiLockPasswordLine } from 'react-icons/ri';
import '../RegisterPage/RegisterPage.css';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState({});
    const [data, setData] = useState({
        fname: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
    
        // Validate form fields
        if (!data.email || !data.password) {
            setError({ message: 'Email and password are required' });
            return;
        }
    
        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
    
            if (response.ok) {
                const { token, email, fullname, pincode, city, score } = await response.json();
                sessionStorage.setItem('token', token);
                sessionStorage.setItem('name', fullname);
                sessionStorage.setItem('email', email);
                sessionStorage.setItem('pincode', pincode);
                sessionStorage.setItem('city', city);
                sessionStorage.setItem('score',score);
                //localStorage.setItem('token', token);
                console.log('Logged in successfully'); // Log success
                console.log("the details are:",email, fullname, pincode, city)
                navigate('/home');
            } else {
                const errorMessage = await response.json();
                setError({ message: errorMessage.message });
            }
        } catch (error) {
            console.error('Error:', error);
            setError({ message: 'Internal server error' });
        }
    };
    

    return (
        <div className="container">
            <div className="container-form">
                <form onSubmit={handleLogin}>
                    <h1>Login</h1>
                    <p>Please sign in to continue.</p>
                    <div className="inputBox">
                        <FiMail className="mail" />
                        <input
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            placeholder="Email"
                        />
                    </div>

                    <div className="inputBox">
                        <RiLockPasswordLine className="password" />
                        <input
                            type="password"
                            name="password"
                            value={data.password}
                            onChange={handleChange}
                            placeholder="Password"
                        />
                    </div>


                    {error.message && (
                        <span style={{ color: 'red', display: 'block', marginTop: '5px' }}>
                            {error.message}
                        </span>
                    )}

                    <div className="divBtn">
                        <small className="FG">Forgot Password?</small>
                        <button type="submit" className="loginBtn">
                            LOGIN
                        </button>
                    </div>
                </form>

                <div className="dont">
                    <p>
                        Don't have an account?{' '}
                        <Link to="/signup">
                            <span>Sign up</span>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;