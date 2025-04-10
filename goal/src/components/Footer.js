import React from 'react'
import styles from '../styles/Footer.module.css'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className={`${styles.footer}`}>
          <div className={`${styles.ctaSection}`}>
            <h2>Start Your Learning Journey Today</h2>
            <p>
              Whether you're preparing for exams or looking to enhance your skills,
              Engineer Astra is here to help you succeed.
            </p>
            <Link to={'/register'} className={`${styles.ctaButton}`}>Join Now</Link>
          </div>

          <div className={`${styles.footerLinks}`}>
            <p>© 2025 Engineer Astra. All rights reserved.</p>
            <div className={`${styles.links}`}>
              <Link to={'/about'}>About</Link>
              <Link to={'/contact'}>Contact</Link>
              <Link to={'/privacy'}>Privacy Policy</Link>
            </div>
          </div>
        </footer>
  )
}

export default Footer