import React, { useContext, useState } from 'react';
import styles from '../styles/Profile.module.css';
import Navbar from './Navbar';
import DownloadCertificateButton from './DownloadCertificateButton';
import { AuthContext } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import courseVideos from './Lectures/CSEPlalistData/data.json';
import courseCategories from './Lectures/category.json';
import axios from 'axios';

const Profile = () => {
    const navigate = useNavigate();
    const { user, courses } = useContext(AuthContext);
    const [textType, setTextType] = useState('text');
    const [formData, setFormData] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        phone: user?.phone || '',
        bio: user?.bio || ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        const { firstName, lastName, phone, bio } = formData;
        const updatedUser = {
            firstName,
            lastName,
            phone,
            bio,
        };


        try {
            const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/auth/updateUser`, {
                userId: user?._id,
                updatedUser,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.data) {
                setTextType('text');
                window.location.reload();
            } else {
                alert("Failed to update profile. Please try again.");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    }

    const handleDownload = (userId, playlistId) => {
        window.open(`http://localhost:3001/?userId=${userId}&playListId=${playlistId}`, '_blank');
    };

    const extractVideoId = (url) => {
        const regex = /[?&]v=([^&#]*)/;
        const match = url.match(regex);
        return match ? match[1] : null; // Return video ID or null if not found
    };

    const handleEdit = () => {
        setTextType(textType === 'text' ? 'input' : 'text');
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
            const category = "ME"; // You can make this dynamic if needed
            const playlist = course.playListName?.split(" ")[0].toLowerCase(); // Or a better slug
            const videoId = extractVideoId(firstUnwatched.url);
            navigate(`/lectures/${category}/${playlist}/${course.playListId}/${videoId}`);
        }
    };

    const userId = user?._id || 'user123';

    console.log(courses)

    const enrolledCourses = courses?.filter(course => !course.isCompleted);
    const completedCourses = courses?.filter(course => course.isCompleted);

    return (
        <div className={styles.main}>
            <Navbar />
            <div className={styles.content}>
                <div className={styles.header}>
                    <h3>My Profile</h3><hr />
                </div>

                <div className={styles.top}>
                    <div className={`${styles.fileInput}`}>
                        <input type="file" id="file" name="file" />
                        <label htmlFor="file">
                            {user?.profileImg ? (
                                <img src={user?.profileImg} alt="Profile Preview" />
                            ) : (
                                <img src="/add-image.webp" alt="add" />
                            )}
                        </label>
                    </div>
                    <div className={styles.details}>
                        <span>{user?.firstName + " " + user?.lastName}</span>
                        <span>{user?.email}</span>
                    </div>
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
                        {enrolledCourses?.map((course, index) => {
                            const progress = course.completedVideos.length / course.totalVideos;
                            return (
                                <div
                                    className={styles.courseCard}
                                    key={index}
                                    onClick={() => navigateToFirstUnwatched(course)}
                                    style={{ cursor: "pointer" }}
                                >
                                    <h4>{course.playListName || "Untitled Playlist"}</h4>
                                    <progress value={progress} max="1"></progress>
                                    <span>{Math.round(progress * 100)}% Completed</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Completed Courses */}
                <div className={styles.courseSection}>
                    <h3>Completed Courses</h3>
                    <div className={styles.courseGrid}>
                        {completedCourses?.map((course, index) => (
                            <div className={styles.courseCard} key={index}>
                                <h4>{course.playListName}</h4>
                                <p>Completed on: {new Date(course.completionDate).toLocaleDateString()}</p>
                                <DownloadCertificateButton handleDownload={() => handleDownload(userId, course.playListId)} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
