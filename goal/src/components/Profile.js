import React, { useContext, useEffect, useState } from 'react';
import styles from '../styles/Profile.module.css';
import Navbar from './Navbar';
import DownloadCertificateButton from './DownloadCertificateButton';
import { AuthContext } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import courseVideos from './Lectures/CSEPlalistData/data.json';
import axios from 'axios';
import CustomButton from './CustomButton';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
    const navigate = useNavigate();
    const { user, courses } = useContext(AuthContext);
    const [textType, setTextType] = useState('text');
    const [preview, setPreview] = useState(null);
    const [formData, setFormData] = useState({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        phone: user?.phone || "",
        bio: user?.bio || "",
        file: null,
    });


    const [enrolledCourses, setEnrolledCourses] = useState([])
    const [completedCourses, setCompletedCourses] = useState([])

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (files && files.length > 0) {
            const file = files[0];
            setPreview(URL.createObjectURL(file));
            setFormData((prev) => ({ ...prev, file }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        const updateData = new FormData();
        updateData.append("userId", user?._id);
        if (formData.firstName) updateData.append("firstName", formData.firstName);
        if (formData.lastName) updateData.append("lastName", formData.lastName);
        if (formData.phone) updateData.append("phone", formData.phone);
        if (formData.bio) updateData.append("bio", formData.bio);
        if (formData.file) updateData.append("file", formData.file);

        try {
            const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/auth/updateUser`, updateData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data) {
                toast.success("Profile updated successfully!");
                window.location.reload();
            } else {
                toast.error("Failed to update profile.");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("Update failed.");
        }
    };


    const handleDownload = (userId, playlistId) => {
        window.open(`${process.env.REACT_APP_CERTIFICATE_URL}/?userId=${userId}&playListId=${playlistId}`, '_blank');
    };

    const extractVideoId = (url) => {
        const regex = /[?&]v=([^&#]*)/;
        const match = url.match(regex);
        return match ? match[1] : null; // Return video ID or null if not found
    };

    const handleEdit = () => {
        setTextType(textType === 'text' ? 'input' : 'text');
        setFormData({
            firstName: user?.firstName || "",
            lastName: user?.lastName || "",
            phone: user?.phone || "",
            bio: user?.bio || "",
            file: null,
        })
    }

    const navigateToFirstUnwatched = (course) => {
        const matchedPlaylist = courseVideos.playlists.find(
            (playlist) => playlist.playlistId === course.playListId
        );

        if (!matchedPlaylist) return;

        const completed = new Set(course.completedVideos);
        const firstUnwatched = matchedPlaylist.videos.find(
            (video) => !completed.has(extractVideoId(video.url))
        );

        if (firstUnwatched) {
            const category = course?.category; // You can make this dynamic if needed
            const playlist = course?.playlist; // Or a better slug
            const videoId = extractVideoId(firstUnwatched.url);
            navigate(`/lectures/${category}/${playlist}/${course.playListId}/${videoId}`);
        }
    };

    useEffect(() => {

        if (courses && courses.length > 0) {
            const enrolled = courses.filter(course => !course.isCompleted);
            const completed = courses.filter(course => course.isCompleted);

            setEnrolledCourses(enrolled);
            setCompletedCourses(completed);
        }
    }, [courses, user]);


    return (
        <div className={styles.main}>
            <ToastContainer />
            <Navbar />
            <div className={styles.content}>
                <div className={styles.header}>
                    <h3>My Profile</h3><hr />
                </div>

                <div className={styles.top}>
                    <div className={`${styles.fileInput}`}>
                        <input type="file" id="file" name="file" onChange={handleChange} />
                        <label htmlFor="file">
                            {preview ? (
                                <img src={preview} alt="Preview" />
                            ) : user?.profileImg ? (
                                <img src={user.profileImg} alt="Profile" />
                            ) : (
                                <img src="/add-image.webp" alt="Add" />
                            )}
                            <span className={styles.profileChangeButton}>✎ Change Profile Image</span>
                        </label>
                    </div>
                    <div className={styles.details}>
                        <span>{user?.firstName + " " + user?.lastName}</span>
                        <span>{user?.email}</span>
                    </div>
                    {preview && (
                        <button className={styles.editBtn} onClick={handleUpdate}>Update</button>
                    )}
                </div>

                {/* Personal Info Card */}
                <div className={styles.section}>
                    <div className={styles.profileHeader}>
                        <h3>Personal Information</h3>
                        <button className={styles.editBtn} onClick={handleEdit}>✎ Edit</button>
                    </div>
                    <div className={styles.profileGrid}>
                        <div className={styles.infoBlock}>
                            <label>First Name</label>
                            {textType === "text" ? (<p>{user?.firstName}</p>) : (
                                <input value={formData.firstName} name='firstName' type="text" defaultValue={user?.firstName} onChange={handleChange} />
                            )}
                        </div>
                        <div className={styles.infoBlock}>
                            <label>Last Name</label>
                            {textType === "text" ? (<p>{user?.lastName}</p>) : (
                                <input type="text" name='lastName' value={formData.lastName} defaultValue={user?.lastName} onChange={handleChange} />
                            )}
                        </div>
                        <div className={styles.infoBlock}>
                            <label>Email</label>
                            <p>{user?.email}</p>
                        </div>
                        <div className={styles.infoBlock}>
                            <label>Phone</label>
                            {textType === "text" ? (<p>+91 <span>{user?.phone}</span></p>) : (
                                <input type="text" name='phone' value={formData.phone} defaultValue={user?.phone} onChange={handleChange} />
                            )}
                        </div>
                        <div className={styles.infoBlock}>
                            <label>Bio</label>
                            {textType === "text" ? (<p>{user?.bio || "No bio available"}</p>) : (
                                <textarea name='bio' value={formData.bio} defaultValue={user?.bio} onChange={handleChange} ></textarea>
                            )}
                        </div>
                    </div>
                    {textType === "input" && (<button style={{ marginTop: "10px" }} className={styles.editBtn} onClick={handleUpdate}>Update</button>)}
                </div>

                {/* Enrolled Courses */}
                <div className={styles.courseSection}>
                    <h3>Continue Where You Left</h3>
                    <div className={styles.courseGrid}>
                        {enrolledCourses.length !== 0 ? enrolledCourses?.map((course, index) => {
                            const progress = course.completedVideos.length / course.totalVideos;
                            return (
                                <div
                                    className={styles.courseCard}
                                    key={index}
                                    style={{ cursor: "pointer" }}
                                >
                                    <h4>{course.playListName || "Untitled Playlist"}</h4>
                                    <progress value={progress} max="1"></progress>
                                    <span>{Math.round(progress * 100)}% Completed</span>
                                    <CustomButton text="Continue" onClick={() => navigateToFirstUnwatched(course)} />
                                </div>
                            );
                        }) : (<div
                            className={styles.courseCard}
                            style={{ cursor: "pointer" }}
                        >
                            <h4>No Ongoing Courses</h4>
                            <p>Enroll in a course to start learning!</p>
                            <button className={styles.editBtn} onClick={() => navigate('/lectures')}>Explore Courses</button>
                        </div>)}
                    </div>
                </div>

                {/* Completed Courses */}
                <div className={styles.courseSection}>
                    <h3>Completed Courses</h3>
                    <div className={styles.courseGrid}>
                        {completedCourses.length !== 0 ? completedCourses?.map((course, index) => (
                            <div className={styles.courseCard} key={index}>
                                <h4>{course.playListName}</h4>
                                <p>Completed on: {new Date(course.completionDate).toLocaleDateString()}</p>
                                <DownloadCertificateButton handleDownload={() => handleDownload(user?._id, course.playListId)} />
                            </div>
                        )) : ((<div
                            className={styles.courseCard}
                            style={{ cursor: "pointer" }}
                        >
                            <h4>No Completed Courses</h4>
                            <p>Complete a course to get certified!</p>
                            <button className={styles.editBtn} onClick={() => navigate('/lectures')}>Explore Courses</button>
                        </div>))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
