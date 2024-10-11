import { React, useState, useEffect } from 'react';
import styles from '../styles/Btech.module.css';
import NavBar from './Navbar';
import colleges from './csvjson.json';

const Btech = () => {
  const [collegeData, setCollegeData] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedReview, setSelectedReview] = useState(null);

  useEffect(() => {
    setCollegeData(colleges);
  }, []);

  // Function to filter colleges based on search query
  const filteredColleges = collegeData.filter(college => {
    const collegeName = typeof college.Name === 'string' ? college.Name.toLowerCase() : '';
    const collegeInstitution = typeof college.college === 'string' ? college.college.toLowerCase() : '';

    return (
      collegeName.includes(query.toLowerCase()) ||
      collegeInstitution.includes(query.toLowerCase())
    );
  });

  // Function to open the modal and show selected review
  const openReviewModal = (review) => {
    setSelectedReview(review);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedReview(null);
  };

  return (
    <div className={styles.main}>
      <NavBar />
      <div className={styles.content}>
        <div className={styles.contentChild}>
          <input 
            type='text' 
            placeholder='Search for colleges' 
            className={styles.search} 
            value={query} 
            onChange={e => setQuery(e.target.value)} 
          />
        </div>
        <div className={styles.header}>
          <h1 className={styles.header1}>Student</h1>
          <h1 className={styles.header2}>College</h1>
          <h1 className={styles.header3}>Reviews</h1>
        </div>
        <div className={styles.collegeList}>
          {filteredColleges.map((college, index) => (
            <div key={index} className={styles.collegeCard}>
              <h2>{college.Name || 'N/A'}</h2>
              <p>{college.college || 'N/A'}</p>
              <button 
                className={styles.reviewButton} 
                onClick={() => openReviewModal(college.review)}
              >
                Show Review
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for displaying review */}
      {selectedReview && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.closeButton} onClick={closeModal}>&times;</span>
            <h2>Review</h2>
            <p>{selectedReview}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Btech;
