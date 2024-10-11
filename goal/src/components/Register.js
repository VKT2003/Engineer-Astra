import React from 'react'
import { useState } from 'react'
import { Link,useNavigate} from 'react-router-dom'
import styles from '../styles/Login.module.css'
import Navbar from './Navbar'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newUser = { name, email, password };
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/register`, newUser);
            console.log(response.data);
            toast.success(response.data.message);
            setTimeout(() => {
                navigate('/login');
            },500);
            navigate('/login');
        } catch (error) {
            toast.error(error.response.data.message)
            setTimeout(() => {
            
            }, 300);
        }
    };


    return (
        <div className={styles.main}>
            <Navbar />
            <div className={styles.content}>
                <div className={styles.contentChild}>
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text" // Use email input type for better validation
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <input
                            type="email" // Use email input type for better validation
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit">Register</button>
                    </form>
                    <p className={styles.register}>
                        Already have an account? <Link to='/login'>Sign In</Link>
                    </p>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Register