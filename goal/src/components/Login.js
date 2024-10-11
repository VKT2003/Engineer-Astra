import { React, useState } from 'react';
import { Link,useNavigate} from 'react-router-dom';
import styles from '../styles/Login.module.css';
import Navbar from './Navbar';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    
    const handleSubmit = async(e) => {
        e.preventDefault();
        const user = { email, password };
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/login`, user);
            localStorage.setItem('token', response.data.token);
            toast.success("login successfull!")
            setTimeout(() => {
                navigate('/')
                window.location.reload();
            }, 2000);
        }
        catch (error) {
            alert(error.response.data.message);
        }
    };

    return (
        <div className={styles.main}>
            <Navbar />
            <div className={styles.content}>
                <div className={styles.contentChild}>
                    <h1>Login</h1>
                    {error && <div className={styles.error}>{error}</div>}
                    <form onSubmit={handleSubmit}>
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
                        <button type="submit">Login</button>
                    </form>
                    <p className={styles.register}>
                        Don't have an account? <Link to = '/register'>Sign Up</Link>
                    </p>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;
