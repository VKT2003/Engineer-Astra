import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../styles/BottomNav.module.css'

const BottomNav = () => {
  return (
    <div className={`${styles.navbar}`}>
      <div className={`${styles.left}`}>
        <ul>
          <li><Link to="/"><i class="fa-solid fa-house"></i> Home</Link></li>
          <li><Link to="/about"><i class="fa-solid fa-address-card"></i> About</Link></li>
          <li className={`${styles.courses}`}><i class="fa-solid fa-book"></i> Courses
            <div className={styles.dropdownContent}>
              <Link to="/btech">B.tech</Link>
              <Link to="/mtech">React Tutorial</Link>
              <Link to="/mba">MBA</Link>
            </div></li>
        </ul>
      </div>
    </div>
  )
}

export default BottomNav
