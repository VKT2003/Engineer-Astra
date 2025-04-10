import React from 'react'
import { useState } from 'react'
import styles from '../styles/VerifyCertificate.module.css'
import Navbar from './Navbar'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VerifyCertificate = () => {
    const [certificateId, setCertificateId] = useState('');
    const [userData, setUserData] = useState('');

    const handleChange = async (e) => {
        const { name, value } = e.target;
        if (name === 'certificateId') {
            setCertificateId(value);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/verifycertificate`, { certificateId });
            if (response.status === 200) {
                setUserData(response.data.userData)
                toast.success('Certificate verified successfully!');
            } else {
                toast.error('Certificate verification failed!');
            }
        } catch (error) {
            console.error(error);
            toast.error('An error occurred while verifying the certificate!');
        }
    };


    return (
        <div className={styles.main}>
            <Navbar />
            <div className={styles.content}>
                <div className={styles.contentChild}>
                    <h1>Verify Certificate</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text" // Use email input type for better validation
                            placeholder="Enter Certificate Id"
                            name="certificateId"
                            value={certificateId}
                            onChange={handleChange}
                            required
                        />
                        <button type="submit">Verify</button>
                    </form>
                    {userData && (
                        <div className={styles.userData}>
                            <h2>User Data:</h2>
                            <p><strong>First Name:</strong> {userData.firstName}</p>
                            <p><strong>Last Name:</strong> {userData.lastName}</p>
                            <p><strong>Email:</strong> {userData.email}</p>
                            <p><strong>Phone:</strong> {userData.phone}</p>
                            <p><strong>Course Name:</strong> {userData.certificates[0].courseName}</p>
                            <p><strong>Completion Date:</strong> {userData.certificates[0].date.split("T")[0]}</p>
                        </div>
                    )}
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default VerifyCertificate;
