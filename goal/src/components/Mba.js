import React, { useEffect, useState } from 'react';
import styles from '../styles/TopColleges.module.css';
import Navbar from './Navbar';
import collegeData from './MbaColleges.json'; // Avoid naming conflict
import Footer from './Footer';


const Mba = () => {
    const [colleges, setColleges] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // Use the imported JSON data to set the colleges state
        setColleges(collegeData.MbaColleges);
    }, []);

    const filteredColleges = colleges.filter(
        (college) =>
            college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            college.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className={styles.main}>
            <Navbar />
            <div className={styles.content}>
                <div className={styles.filterCollege}>
                    <i class="fa-sharp fa-solid fa-magnifying-glass"></i>
                    <input
                        type="text"
                        placeholder="Search by college name or location..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={styles.searchInput}

                    />
                </div>
                {/* Check if colleges array has data and map over it */}
                <div className={styles.contentChild}>
                    {filteredColleges.length > 0 ? (
                        filteredColleges.map((college, index) => (
                            <div key={index} className={styles.collegeCard}>
                                <div>
                                    <h2 style={{ textAlign: 'center' }}>{college.name}</h2>
                                    <p><strong>Location:</strong> {college.location}</p>
                                    <p><strong>Courses Offered:</strong> {college.courses_offered.join(', ')}</p>
                                    <p><strong>Admission Process:</strong></p>
                                    <ul style={{ marginTop: 20 }}>
                                        {Object.keys(college.admission_process).map((courseKey, i) => (
                                            <li key={i} style={{ marginTop: 10 }}>
                                                <strong>{courseKey}:</strong> Entrance Exam - {college.admission_process[courseKey].entrance_exam}, Eligibility - {college.admission_process[courseKey].eligibility}
                                            </li>
                                        ))}
                                    </ul>
                                    <p><strong>Fees:</strong> B.Tech - {college.fee_structure.btech}, MBA - {college.fee_structure.mba}</p>
                                    <p><strong>Scholarships: </strong>{college.scholarships.join(', ')}</p>
                                    <p><strong>Facilities: </strong>{college.facilities.join(', ')}</p>
                                    <p><strong>Placement Records:</strong> Average Package - {college.placement_records.average_package}, Highest Package - {college.placement_records.highest_package}</p>
                                    <p><strong>Important-dates: </strong>{Object.keys(college.important_dates).map((event, key) => (
                                        <p key={key}><strong>{event}:</strong> {college.important_dates[event]}</p>
                                    ))}</p>
                                </div>
                                <a href={college.important_urls.admission_link} className={styles.admission}>Get Admission</a>
                            </div>
                        ))
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default Mba;
