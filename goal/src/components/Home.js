import React, { useState,useEffect } from 'react';
import styles from '../styles/Home.module.css';
import Navbar from './Navbar';
import collegeData from './college.json'

const Home = () => {
  const [percentage, setPercentage] = useState('');
  const [colleges, setColleges] = useState([]);
  const [jeeRank, setJeeRank] = useState('');
  const [filteredColleges,setFilteredColleges] = useState([]);

  useEffect(() => {
    setColleges(collegeData.colleges);
  }, []);

  const calculate = async () => {
    const results = colleges.filter((college)=>
      college.eligibility_criteria.jeeRank >= jeeRank && 
      college.eligibility_criteria["12thPercentage"] <= percentage
    );
    setFilteredColleges(results);
};


  return (
    <div className={styles.main}>
      <Navbar />
      <div className={styles.content}>
        <div className={styles.contentChild}>
          <input 
            type='number' 
            placeholder='Enter 12th percentage' 
            value={percentage} 
            onChange={e => setPercentage(e.target.value)} 
          />
          <input 
            type='number' 
            placeholder='Enter JEE Rank' 
            value={jeeRank} 
            onChange={e => setJeeRank(e.target.value)} 
          />
          <input 
            type='button' 
            value='Search Colleges' 
            onClick={calculate} 
          />
        </div>
        <div className={`${styles.collegeGrid}`}>
        {filteredColleges.length > 0 ? (
          filteredColleges.map((college, index) => (
            <div className={styles.collegeCard} key={index}>
              {/* <img src={college.imgUrl} alt={college.college_name} /> */}
              <h2>{college.college_name}</h2>
              <p><strong>Location:</strong> {college.location}</p>
              <p><strong>Affiliation:</strong> {college.affiliation}</p>
              <p><strong>Accreditation:</strong> {college.accreditation}</p>
              <p><strong>Established Year:</strong> {college.established_year}</p>
              <h3>Courses:</h3>
              {college.courses.map((course, idx) => (
                <div key={idx}>
                  <p><strong>Course:</strong> {course.name}</p>
                  <p><strong>Fees:</strong> INR {course.fees.total}</p>
                  <p><strong>Placements:</strong> Avg. Package {course.placements.averagePackage}, Highest {course.placements.highestPackage}</p>
                </div>
              ))}
              <p><strong>Facilities:</strong> {college.facilities.join(", ")}</p>
              <p><strong>Admission Process:</strong> {college.admission_process.jeeMain}</p>
              <p><strong>Contact:</strong> {college.contact_info.phone}, {college.contact_info.email}</p>
            </div>
          ))
        ) : (
          <p>No colleges found matching your criteria.</p>
        )}
      </div>
      </div>
    </div>
  );
};

export default Home;
