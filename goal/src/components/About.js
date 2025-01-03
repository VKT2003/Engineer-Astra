import React from 'react';
import styles from '../styles/About.module.css';
import Navbar from './Navbar';

const About = () => {
  return (
    <div className={styles.main}>
      <Navbar />
      <div className={styles.content}>
        <h1>About Our Platform</h1>
        <p>
          Welcome to <strong>Engineer Astra</strong>, a comprehensive web application designed to assist students in exploring and gaining admission to the top colleges across India. 
        </p>
        <p>
          Whether you’re looking to find colleges based on your rank and percentage or explore the wide range of courses we offer, we’re here to make the process smoother. After completing a course, students can also earn certificates to boost their credentials. 
        </p>
        <h2>Key Features:</h2>
        <ul>
          <li>Find colleges based on your rank and percentage.</li>
          <li>Explore diverse courses and earn certificates after completion.</li>
          <li>Access comprehensive B.Tech subject notes.</li>
          <li>AI-driven helpdesk to assist students in real-time.</li>
          <li>List of all colleges in India for easy reference.</li>
        </ul>
        <p>
          This platform is designed to simplify the college admission process and help you excel in your academic journey.
        </p>
        <p className={styles.creator}>Created by <strong>Vishal Tiwari & Vikas Jadon</strong>, B.Tech CSE (AI & ML).</p>
      </div>
    </div>
  );
};

export default About;
