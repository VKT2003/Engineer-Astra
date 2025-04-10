import React, { useState } from 'react';
import styles from '../styles/CollegeList.module.css';
import Navbar from './Navbar';

const CollegeList = () => {
    const [colleges, setColleges] = useState([]);
    const [filterType, setFilterType] = useState('state'); // Default to 'state' to avoid issues with placeholder
    const [filterValue, setFilterValue] = useState('');
    const [filteredColleges, setFilteredColleges] = useState([]);

    // Fetch the JSON data from the hosted URL
    const fetchDataAndFilter = () => {
        fetch('https://raw.githubusercontent.com/VarthanV/Indian-Colleges-List/master/colleges.json')
            .then(response => response.json())
            .then(data => {
                setColleges(data);

                // Apply filtering
                const filtered = data.filter(college => {
                    if (filterType === 'state') {
                        return college.state.toLowerCase().includes(filterValue.toLowerCase());
                    } else if (filterType === 'district') {
                        return college.district.toLowerCase().includes(filterValue.toLowerCase());
                    }
                    return true;
                });

                setFilteredColleges(filtered);
            });
    };

    const handleFilterTypeChange = (e) => {
        setFilterType(e.target.value);
        setFilterValue(''); // Reset filter value when filter type changes
    };

    return (
        <div className={`${styles.main}`}>
            <Navbar />
            <div className={`${styles.content}`}>
                <img src="https://images.collegedunia.com/public/asset/img/homepage/banner/Indian1642232499.webp?mode=stretch" loading='lazy' alt="none" />
                <div className={`${styles.contentChild}`}>
                    <h1>College List</h1>
                    <label>Filter by: </label>
                    <select value={filterType} onChange={handleFilterTypeChange}>
                        <option value="state">State</option>
                        <option value="district">District</option>
                    </select>
                    <input
                        type="text"
                        value={filterValue}
                        onChange={(e) => setFilterValue(e.target.value)}
                        placeholder={`Enter ${filterType}`}
                    
                    />
                    <input type='button' value="Search" onClick={fetchDataAndFilter} />
                </div>
                <div className={`${styles.gridContainer}`}>
                    {filteredColleges.map((college, index) => (
                        <div key={index} className={`${styles.gridItems}`}>
                            <strong>{college.college}</strong>
                            <p>{college.district}, {college.state}</p>
                            <p><em>{college.university}</em></p>
                            <p>Type: {college.college_type}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CollegeList;
