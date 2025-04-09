import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from '../styles/Login.module.css'
import Navbar from './Navbar'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [profileImg, setProfileImg] = useState('')
    const [phone, setPhone] = useState('')
    const [preview, setPreview] = useState(null);
    
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        file: null,
    });

    const navigate = useNavigate();

    const handleChange = async (e) => {
        const { name, value, files } = e.target;

        if (files && files[0]) {
            const selectedFile = files[0];

            // Generate preview URL
            setPreview(URL.createObjectURL(selectedFile));

            setFormData((prev) => ({
                ...prev,
                file: selectedFile, // Store the actual file
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/register`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
            localStorage.setItem('token', response.data.token);
            toast.success(response.data.message);
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (error) {
            toast.error(error.response.data.message)
            setTimeout(() => {
                navigate('/');
            }, 2000);
        }
    };


    return (
        <div className={styles.main}>
            <Navbar />
            <div className={styles.content}>
                <div className={styles.contentChild}>
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit}>
                        <div className={`${styles.fileInput}`}>
                            <input type="file" id="file" name="file" onChange={handleChange} />
                            <label htmlFor="file">
                                {preview ? (
                                    <img src={preview} alt="Profile Preview" style={{ width: "100px", height: "100px", borderRadius: "50%" }} />
                                ) : (
                                    <img src="/add-image.webp" alt="add" />
                                )}
                            </label>
                            <p>Profile Picture</p>
                        </div>
                        <div className={`${styles.inputName}`}>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder="First Name"
                                required
                            />
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder="Last Name"
                            />
                        </div>
                        <input
                            type="email" // Use email input type for better validation
                            placeholder="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text" // Use email input type for better validation
                            placeholder="Phone No"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
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