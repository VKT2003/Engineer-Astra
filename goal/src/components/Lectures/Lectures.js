import React, { useState, useEffect } from 'react';
import styles from '../../styles/Lectures.module.css';
import Navbar from '../Navbar';
import { Link } from 'react-router-dom';
import lectureCategory from './category.json';

const Lectures = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Setting categories from imported data
        setCategories(lectureCategory.courseCategories);
    }, []);

    return (
        <div className={styles.main}>
            <Navbar />
            <div className={styles.content}>
                <h2>Categories..</h2>
                <div className={styles.cardsContainer}>
                    {categories.map(category => (
                        <div key={category.id} className={styles.card}>
                            <img src={category.imageUrl} alt={category.categoryName} className={styles.cardImage} />
                            <div className={`${styles.cardContent}`}>
                                <h3>{category.categoryName}</h3>
                                <p>{category.description}</p>
                                <Link
                                    to={`/lectures/${category.categoryName.match(/\(([^)]+)\)/)
                                            ? category.categoryName.match(/\(([^)]+)\)/)[1]
                                            : category.categoryName // Fallback in case there's no match
                                        }`}
                                    className={styles.cardLink}>
                                    View Lectures
                                </Link>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Lectures;
