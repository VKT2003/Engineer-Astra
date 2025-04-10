import React, { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';
import Navbar from './Navbar';
import { Helmet } from 'react-helmet';
import collegeData from './college.json'
import Footer from './Footer';
import testimonials from './studentData.json';

const Home = () => {
  const [percentage, setPercentage] = useState('');
  const [colleges, setColleges] = useState([]);
  const [jeeRank, setJeeRank] = useState('');
  const [filteredColleges, setFilteredColleges] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    setColleges(collegeData.colleges);
  }, []);

  const calculate = async () => {
    const results = colleges.filter((college) =>
      college.eligibility_criteria.jeeRank >= jeeRank &&
      college.eligibility_criteria["12thPercentage"] <= percentage
    );
    setFilteredColleges(results);
  };


  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);


  return (
    <div className={styles.main}>
      <Helmet>
        <title>Engineer Astra - Find Top Colleges in India</title>
        <meta name="description" content="Explore top engineering colleges in India based on your JEE rank and 12th percentage. Find admission details, course fees, placements, and more." />
        <meta name="keywords" content="engineering colleges, JEE rank, admission, India, 12th percentage, college finder, placements, courses" />
        <script type="application/ld+json">
          {`
            {
              "@context": "http://schema.org",
              "@type": "EducationalOrganization",
              "name": "Engineer Astra",
              "url": "https://engineer-astra.vercel.app",
              "sameAs": "https://www.linkedin.com/company/engineer-astra/",
              "description": "Find the best engineering colleges in India based on your JEE rank and 12th percentage."
            }
          `}
        </script>
      </Helmet>
      <Navbar />
      <div className={styles.content}>
        <div className={styles.homeContainer}>
          <img loading='lazy' src='/background.jpg' className={`${styles.background}`} alt='' />
          <div className={`${styles.heroSection}`}>
            <div className={styles.heroText}>
              <h1>ENGINEER ASTRA</h1>
              <p>Your guide to the best engineering colleges in India.</p>
            </div>
          </div>
        </div>

        <div className={styles.aboutSection}>
          <h2>About Engineer Astra</h2>
          <p>Engineer Astra is your one-stop solution for finding the best engineering colleges in India based on your JEE rank and 12th percentage. We provide detailed information about colleges, courses, fees, placements, and more.</p>
          <div className={`${styles.cards}`}>
            <div className={styles.card}>
              <img src="/courses.svg" alt="courses" loading='lazy' />
              <h3>Free Courses</h3>
              <p>Access a wide range of courses, lectures and even notes.</p>
            </div>
            <div className={styles.card}>
              <img src="/progress.svg" alt="courses" loading='lazy' />
              <h3>Track Progress</h3>
              <p>Monitor your learning progress and achievements.</p>
            </div>
            <div className={styles.card}>
              <img src="/certificate.svg" alt="courses" loading='lazy' />
              <h3>Certification</h3>
              <p>Earn certificates to enhance your academic and technical profile.</p>
            </div>
            <div className={styles.card}>
              <img src="/community.svg" alt="courses" loading='lazy' />
              <h3>Community</h3>
              <p>Join a vibrant community of engineers.</p>
            </div>
          </div>
        </div>

        <div className={`${styles.collegeSection}`}>
          <h2>Find Colleges According To Your 12th Percentage And JEE Rank</h2>
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
            <p>It will display the colleges with your suitable rank and percentage.</p>
          )}
        </div>
        <div className={styles.testimonials}>
          <h2>What Students Say</h2>
          <div className={styles.carousel}>
            <button className={styles.arrow} onClick={prev}>&lt;</button>

            <div className={styles.testimonialCard}>
              <p>"{testimonials[current].text}"</p>
              <p>- {testimonials[current].author}</p>
            </div>

            <button className={styles.arrow} onClick={next}>&gt;</button>
          </div>

          <div className={styles.dots}>
            {testimonials.map((_, index) => (
              <span
                key={index}
                onClick={() => setCurrent(index)}
                className={`${styles.dot} ${index === current ? styles.activeDot : ''
                  }`}
              />
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
