import React, { useState, useEffect } from 'react';
import styles from '../../styles/Lectures.module.css';
import Navbar from '../Navbar';
import { Link } from 'react-router-dom';
import lectureCategory from '../Lectures/CategoryPlaylist.json'; // Your JSON data
import { useParams } from 'react-router-dom';

const LectureCategory = () => {
    const { category } = useParams();
    const [selectedCategory, setSelectedCategory] = useState(null);
    
    useEffect(() => {
        // Find the selected category from the imported data based on the URL parameter
        const categoryData = lectureCategory[category];
        if (categoryData) {
            setSelectedCategory(categoryData.courses); // Set courses for the selected category
        }
    }, [category]);

    return (
        <div className={styles.main}>
            <Navbar />
            <div className={styles.content}>
                <h2>{category} Courses</h2>
                <div className={styles.cardsContainer}>
                    {selectedCategory ? (
                        selectedCategory.map((course, index) => (
                            <div key={index} className={styles.card}>
                                {/* Assuming each course has an imgUrl for image */}
                                <img src={course.imgUrl || '/defaultImage.jpg'} alt={course.name} className={styles.cardImage} />
                                <div className={`${styles.cardContent}`}>
                                    <h3>{course.name}</h3>
                                    <p>{course.description}</p>
                                    <p>Duration: {course.duration}</p>
                                    <p>Level: {course.level}</p>
                                    <Link to={`/lectures/${category}/${course.name}`} className={styles.cardLink}>
                                        View Lectures
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No courses available for this category.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LectureCategory;
